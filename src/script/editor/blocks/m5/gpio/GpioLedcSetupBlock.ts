import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class GpioLedcSetupBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-gpio-ledc-setup";
    public static readonly CHANNEL: string = "CHANNEL";
    public static readonly FREQUENCY: string = "FREQUENCY";
    public static readonly RESOLUTION_BITS: string = "RESOLUTION_BITS";

    public identifier(): string {
        return GpioLedcSetupBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_GPIO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(GpioLedcSetupBlock.CHANNEL)
                    .appendField('setup LEDC channel')
                this.appendValueInput(GpioLedcSetupBlock.FREQUENCY)
                    .appendField('with frequency')
                this.appendValueInput(GpioLedcSetupBlock.RESOLUTION_BITS)
                    .appendField('and resolution bits')
                this.setOutput(true, null);
                this.setInputsInline(true)
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const channel = generator.valueToCode(block, GpioLedcSetupBlock.CHANNEL, Order.NONE);
        const frequency = generator.valueToCode(block, GpioLedcSetupBlock.FREQUENCY, Order.NONE);
        const resolutionBits = generator.valueToCode(block, GpioLedcSetupBlock.RESOLUTION_BITS, Order.NONE);

        return ["ledcSetup(" + channel + ", " + frequency + ", " + resolutionBits + ")", Order.NONE]
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [GpioLedcSetupBlock.CHANNEL]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [GpioLedcSetupBlock.FREQUENCY]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [GpioLedcSetupBlock.RESOLUTION_BITS]: {
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