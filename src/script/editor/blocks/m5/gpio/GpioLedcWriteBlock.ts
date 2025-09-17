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

export class GpioLedcWriteBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-ledc-write";
    public static readonly CHANNEL: string = "CHANNEL";
    public static readonly DUTY: string = "DUTY";

    public identifier(): string {
        return GpioLedcWriteBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioLedcWriteBlock.CHANNEL)
                    .appendField('write to ledc channel')
                this.appendValueInput(GpioLedcWriteBlock.DUTY)
                    .appendField('duty')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setInputsInline(true)
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const channel = generator.valueToCode(block, GpioLedcWriteBlock.CHANNEL, Order.NONE);
        const duty = generator.valueToCode(block, GpioLedcWriteBlock.DUTY, Order.NONE);

        return "ledcWrite(" + channel + ", " + duty + ");"
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioLedcWriteBlock.CHANNEL]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [GpioLedcWriteBlock.DUTY]: {
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