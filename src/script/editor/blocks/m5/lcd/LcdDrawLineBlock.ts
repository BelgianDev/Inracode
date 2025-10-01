
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

export class LcdDrawLineBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-draw-line";

    public static readonly X1: string = "X1";
    public static readonly Y1: string = "Y1";
    public static readonly X2: string = "X2";
    public static readonly Y2: string = "Y2";

    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdDrawLineBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_GRAPHICS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdDrawLineBlock.X1)
                    .setCheck('Number')
                    .appendField('draw line from points:')
                    .appendField('1-X:');
                this.appendValueInput(LcdDrawLineBlock.Y1)
                    .setCheck('Number')
                    .appendField('1-Y:');

                this.appendValueInput(LcdDrawLineBlock.X2)
                .setCheck('Number')
                    .appendField('2-X:');
                this.appendValueInput(LcdDrawLineBlock.Y2)
                .setCheck('Number')
                    .appendField('2-Y:');

                this.appendValueInput(LcdDrawLineBlock.COLOR)
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
        const x1 = generator.valueToCode(block, LcdDrawLineBlock.X1, Order.NONE);
        const y1 = generator.valueToCode(block, LcdDrawLineBlock.Y1, Order.NONE);

        const x2 = generator.valueToCode(block, LcdDrawLineBlock.X2, Order.NONE);
        const y2 = generator.valueToCode(block, LcdDrawLineBlock.Y2, Order.NONE);

        const color = generator.valueToCode(block, LcdDrawLineBlock.COLOR, Order.NONE);

        return "M5.Lcd.drawLine(" + x1 + ", " + y1 + ", " + x2 + ", " + y2 + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdDrawLineBlock.X1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.Y1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.X2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.Y2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.COLOR]: {
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
                [LcdDrawLineBlock.X1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.Y1]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.X2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.Y2]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdDrawLineBlock.COLOR]: {
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