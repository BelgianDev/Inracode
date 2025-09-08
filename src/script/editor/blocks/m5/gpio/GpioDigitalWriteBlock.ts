import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";
import {BooleanBlock} from "../../variable/BooleanBlock.ts";

export class GpioDigitalWriteBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-digital-write";
    public static readonly PIN_NUMBER: string = "PIN_NUMBER";
    public static readonly VALUE: string = "VALUE";

    protected identifier(): string {
        return GpioDigitalWriteBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioDigitalWriteBlock.VALUE)
                    .appendField('write')
                this.appendValueInput(GpioDigitalWriteBlock.PIN_NUMBER)
                    .appendField('to pin')
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const pinNumber = generator.valueToCode(block, GpioDigitalWriteBlock.PIN_NUMBER, Order.NONE);
        const value = generator.valueToCode(block, GpioDigitalWriteBlock.VALUE, Order.NONE);

        return "digitalWrite(" + pinNumber + ", " + value + ");"
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioDigitalWriteBlock.VALUE]: {
                    "block": {
                        "type": BooleanBlock.IDENTIFIER,
                        "fields": {
                            [BooleanBlock.BOOLEAN]: true
                        }
                    }
                },
                [GpioDigitalWriteBlock.PIN_NUMBER]: {
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