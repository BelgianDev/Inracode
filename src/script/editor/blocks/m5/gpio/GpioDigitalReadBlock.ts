import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class GpioDigitalReadBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-digital-read";
    public static readonly PIN_NUMBER: string = "PIN_NUMBER";

    public identifier(): string {
        return GpioDigitalReadBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioDigitalReadBlock.PIN_NUMBER)
                    .appendField('read from pin')
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const pinNumber = generator.valueToCode(block, GpioDigitalReadBlock.PIN_NUMBER, Order.NONE);
        return ["digitalRead(" + pinNumber + ")", Order.NONE]
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioDigitalReadBlock.PIN_NUMBER]: {
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