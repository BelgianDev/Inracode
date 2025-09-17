import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class GpioLedcDetachPinBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-ledc-detach-pin";
    public static readonly CHANNEL: string = "CHANNEL";
    public static readonly PIN: string = "PIN";

    public identifier(): string {
        return GpioLedcDetachPinBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioLedcDetachPinBlock.PIN)
                    .appendField('ledc dettach pin')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setInputsInline(true)
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const pinNumber = generator.valueToCode(block, GpioLedcDetachPinBlock.PIN, Order.NONE);
        const channel = generator.valueToCode(block, GpioLedcDetachPinBlock.CHANNEL, Order.NONE);

        return "ledcDetachPin(" + pinNumber + ", " + channel + ");"
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioLedcDetachPinBlock.PIN]: {
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