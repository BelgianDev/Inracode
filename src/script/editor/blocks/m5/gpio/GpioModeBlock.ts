import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";
import {BooleanBlock} from "../../variable/BooleanBlock.ts";

export class GpioModeBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-mode";
    public static readonly PIN_NUMBER: string = "PIN_NUMBER";
    public static readonly MODE: string = "MODE";

    protected identifier(): string {
        return GpioModeBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioModeBlock.PIN_NUMBER)
                    .appendField('set pin')
                this.appendDummyInput('')
                    .appendField('mode to')
                    .appendField(new Blockly.FieldDropdown([
                        ["INPUT", "INPUT"],
                        ["OUTPUT", "OUTPUT"],
                        ["INPUT_PULLUP", "INPUT_PULLUP"],
                    ]), GpioModeBlock.MODE)

                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const pinNumber = generator.valueToCode(block, GpioModeBlock.PIN_NUMBER, Order.NONE);
        const mode = block.getFieldValue(GpioModeBlock.MODE)

        return "pinMode(" + pinNumber + ", " + mode + ");"
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioModeBlock.PIN_NUMBER]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                }
            }
        })
    }
}