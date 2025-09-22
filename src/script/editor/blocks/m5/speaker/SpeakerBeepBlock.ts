import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class SpeakerBeepBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-speaker-beep";
    public static readonly FREQ: string = "X";
    public static readonly DURATION: string = "Y";

    public identifier(): string {
        return SpeakerBeepBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_SPEAKER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(SpeakerBeepBlock.FREQ)
                    .setCheck('Number')
                    .appendField('beep with pitch')
                this.appendValueInput(SpeakerBeepBlock.DURATION)
                    .setCheck('Number')
                    .appendField('for');
                this.appendDummyInput()
                    .appendField('milliseconds');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const frequency = generator.valueToCode(block, SpeakerBeepBlock.FREQ, Order.NONE);
        const duration = generator.valueToCode(block, SpeakerBeepBlock.DURATION, Order.NONE);

        return "M5.Speaker.setBeep(" + frequency + ", " + duration + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SpeakerBeepBlock.FREQ]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 900
                        }
                    }
                },
                [SpeakerBeepBlock.DURATION]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1000
                        }
                    }
                }
            }
        })
    }
}