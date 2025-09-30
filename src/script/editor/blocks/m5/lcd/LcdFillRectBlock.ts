
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

export class LcdFillRectBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-fill-rect";

    public static readonly X: string = "X";
    public static readonly Y: string = "Y";
    public static readonly SIZE_X: string = "SIZE_X";
    public static readonly SIZE_Y: string = "SIZE_Y";
    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdFillRectBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdFillRectBlock.X)
                    .setCheck('Number')
                    .appendField('fill rectangle at')
                    .appendField('X:');
                this.appendValueInput(LcdFillRectBlock.Y)
                    .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdFillRectBlock.SIZE_X)
                .setCheck('Number')
                    .appendField('with size')
                    .appendField('X:');
                this.appendValueInput(LcdFillRectBlock.SIZE_Y)
                .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdFillRectBlock.COLOR)
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
        const x = generator.valueToCode(block, LcdFillRectBlock.X, Order.NONE);
        const y = generator.valueToCode(block, LcdFillRectBlock.Y, Order.NONE);

        const sizeX = generator.valueToCode(block, LcdFillRectBlock.SIZE_X, Order.NONE);
        const sizeY = generator.valueToCode(block, LcdFillRectBlock.SIZE_Y, Order.NONE);

        const color = generator.valueToCode(block, LcdFillRectBlock.COLOR, Order.NONE);

        return "M5.Lcd.fillRect(" + x + ", " + y + ", " + sizeX + ", " + sizeY + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdFillRectBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.SIZE_X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.SIZE_Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.COLOR]: {
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
                [LcdFillRectBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.SIZE_X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.SIZE_Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillRectBlock.COLOR]: {
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