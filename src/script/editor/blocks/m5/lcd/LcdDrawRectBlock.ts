
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

export class LcdDrawRectBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-draw-rect";

    public static readonly X: string = "X";
    public static readonly Y: string = "Y";
    public static readonly SIZE_X: string = "SIZE_X";
    public static readonly SIZE_Y: string = "SIZE_Y";
    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdDrawRectBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_GRAPHICS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdDrawRectBlock.X)
                    .setCheck('Number')
                    .appendField('draw rectangle at')
                    .appendField('X:');
                this.appendValueInput(LcdDrawRectBlock.Y)
                    .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdDrawRectBlock.SIZE_X)
                .setCheck('Number')
                    .appendField('with size')
                    .appendField('X:');
                this.appendValueInput(LcdDrawRectBlock.SIZE_Y)
                .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdDrawRectBlock.COLOR)
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
        const x = generator.valueToCode(block, LcdDrawRectBlock.X, Order.NONE);
        const y = generator.valueToCode(block, LcdDrawRectBlock.Y, Order.NONE);

        const sizeX = generator.valueToCode(block, LcdDrawRectBlock.SIZE_X, Order.NONE);
        const sizeY = generator.valueToCode(block, LcdDrawRectBlock.SIZE_Y, Order.NONE);

        const color = generator.valueToCode(block, LcdDrawRectBlock.COLOR, Order.NONE);

        return "M5.Lcd.drawRect(" + x + ", " + y + ", " + sizeX + ", " + sizeY + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdDrawRectBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.SIZE_X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.SIZE_Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.COLOR]: {
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
                [LcdDrawRectBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.SIZE_X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.SIZE_Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawRectBlock.COLOR]: {
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