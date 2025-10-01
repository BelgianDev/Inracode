
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

export class LcdDrawTriangleBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-draw-triangle";

    public static readonly X1: string = "X1";
    public static readonly Y1: string = "Y1";
    public static readonly X2: string = "X2";
    public static readonly Y2: string = "Y2";
    public static readonly X3: string = "X3";
    public static readonly Y3: string = "Y3";

    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdDrawTriangleBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_GRAPHICS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdDrawTriangleBlock.X1)
                    .setCheck('Number')
                    .appendField('draw triangle from points:')
                    .appendField('1-X:');
                this.appendValueInput(LcdDrawTriangleBlock.Y1)
                    .setCheck('Number')
                    .appendField('1-Y:');

                this.appendValueInput(LcdDrawTriangleBlock.X2)
                .setCheck('Number')
                    .appendField('2-X:');
                this.appendValueInput(LcdDrawTriangleBlock.Y2)
                .setCheck('Number')
                    .appendField('2-Y:');

                this.appendValueInput(LcdDrawTriangleBlock.X3)
                    .setCheck('Number')
                    .appendField('3-X:');
                this.appendValueInput(LcdDrawTriangleBlock.Y3)
                    .setCheck('Number')
                    .appendField('3-Y:');

                this.appendValueInput(LcdDrawTriangleBlock.COLOR)
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
        const x1 = generator.valueToCode(block, LcdDrawTriangleBlock.X1, Order.NONE);
        const y1 = generator.valueToCode(block, LcdDrawTriangleBlock.Y1, Order.NONE);

        const x2 = generator.valueToCode(block, LcdDrawTriangleBlock.X2, Order.NONE);
        const y2 = generator.valueToCode(block, LcdDrawTriangleBlock.Y2, Order.NONE);

        const x3 = generator.valueToCode(block, LcdDrawTriangleBlock.X3, Order.NONE);
        const y3 = generator.valueToCode(block, LcdDrawTriangleBlock.Y3, Order.NONE);

        const color = generator.valueToCode(block, LcdDrawTriangleBlock.COLOR, Order.NONE);

        return "M5.Lcd.drawTriangle(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ", " + x3 + ", " + y3 + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdDrawTriangleBlock.X1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.X2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.X3]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y3]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.COLOR]: {
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
                [LcdDrawTriangleBlock.X1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.X2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.X3]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.Y3]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawTriangleBlock.COLOR]: {
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