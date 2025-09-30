
import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {ColorBlock} from "../../variable/ColorBlock.ts";
import {HexBlock} from "../../variable/HexBlock.ts";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class LcdDrawCircleBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-draw-circle";

    public static readonly X: string = "X";
    public static readonly Y: string = "Y";
    public static readonly RADIUS: string = "RADIUS";
    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdDrawCircleBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdDrawCircleBlock.X)
                    .setCheck('Number')
                    .appendField('draw circle at')
                    .appendField('X:');
                this.appendValueInput(LcdDrawCircleBlock.Y)
                    .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdDrawCircleBlock.RADIUS)
                    .setCheck('Number')
                    .appendField('with radius')

                this.appendValueInput(LcdDrawCircleBlock.COLOR)
                    .appendField('with the color')

                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const x = generator.valueToCode(block, LcdDrawCircleBlock.X, Order.NONE);
        const y = generator.valueToCode(block, LcdDrawCircleBlock.Y, Order.NONE);

        const radius = generator.valueToCode(block, LcdDrawCircleBlock.RADIUS, Order.NONE);
        const color = generator.valueToCode(block, LcdDrawCircleBlock.COLOR, Order.NONE);

        return "M5.Lcd.drawCircle(" + x + ", " + y + ", " + radius + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdDrawCircleBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.RADIUS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.COLOR]: {
                    "block": {
                        "type": ColorBlock.IDENTIFIER,
                    }
                }
            }
        })

        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdDrawCircleBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.RADIUS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawCircleBlock.COLOR]: {
                    "block": {
                        "type": HexBlock.IDENTIFIER,
                        "fields": {
                            [HexBlock.HEX]: "0000" // Black defined inside the ESP32 library, see DefinedColors for more details.
                        }
                    }
                }
            }
        })
    }
}