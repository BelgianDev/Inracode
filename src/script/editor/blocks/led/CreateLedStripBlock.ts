import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class CreateLedStripBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "led-strip-create";
    public static readonly NAME: string = "NAME";
    public static readonly PIN: string = "PIN";
    public static readonly NUM_LEDS: string = "NUM_LEDS";

    public identifier(): string {
        return CreateLedStripBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.NEO_PIXEL_LED_STRIP;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(CreateLedStripBlock.NUM_LEDS)
                    .appendField('create a LED strip with name')
                    .appendField(new Blockly.FieldTextInput('myStrip'), CreateLedStripBlock.NAME)
                    .appendField('with')
                this.appendValueInput(CreateLedStripBlock.PIN)
                    .appendField('LEDs and on pin')

                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(CreateLedStripBlock.NAME);
        const numberLEDs = generator.valueToCode(block, CreateLedStripBlock.NUM_LEDS, Order.NONE)
        const pin = generator.valueToCode(block, CreateLedStripBlock.PIN, Order.NONE)

        return "AdaFruit_NeoPixel " + name + "(" + numberLEDs + ", " + pin + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [CreateLedStripBlock.NUM_LEDS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 16
                        }
                    }
                },
                [CreateLedStripBlock.PIN]: {
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