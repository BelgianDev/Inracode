import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";
import {BooleanBlock} from "../../variable/BooleanBlock.ts";

export class GpioLedcAttachPinBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-ledc-attach-pin";
    public static readonly CHANNEL: string = "CHANNEL";
    public static readonly PIN: string = "PIN";

    public identifier(): string {
        return GpioLedcAttachPinBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioLedcAttachPinBlock.PIN)
                    .appendField('ledc attach pin')
                this.appendValueInput(GpioLedcAttachPinBlock.CHANNEL)
                    .appendField('with channel')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setInputsInline(true)
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const pinNumber = generator.valueToCode(block, GpioLedcAttachPinBlock.PIN, Order.NONE);
        const channel = generator.valueToCode(block, GpioLedcAttachPinBlock.CHANNEL, Order.NONE);

        return "ledcAttachPin(" + pinNumber + ", " + channel + ");"
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioLedcAttachPinBlock.CHANNEL]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [GpioLedcAttachPinBlock.PIN]: {
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