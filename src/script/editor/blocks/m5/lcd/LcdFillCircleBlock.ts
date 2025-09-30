
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

export class LcdFillCircleBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-fill-circle";

    public static readonly X: string = "X";
    public static readonly Y: string = "Y";
    public static readonly RADIUS: string = "RADIUS";
    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdFillCircleBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdFillCircleBlock.X)
                    .setCheck('Number')
                    .appendField('fill circle at')
                    .appendField('X:');
                this.appendValueInput(LcdFillCircleBlock.Y)
                    .setCheck('Number')
                    .appendField('Y:');

                this.appendValueInput(LcdFillCircleBlock.RADIUS)
                    .setCheck('Number')
                    .appendField('with radius')

                this.appendValueInput(LcdFillCircleBlock.COLOR)
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
        const x = generator.valueToCode(block, LcdFillCircleBlock.X, Order.NONE);
        const y = generator.valueToCode(block, LcdFillCircleBlock.Y, Order.NONE);

        const radius = generator.valueToCode(block, LcdFillCircleBlock.RADIUS, Order.NONE);
        const color = generator.valueToCode(block, LcdFillCircleBlock.COLOR, Order.NONE);

        return "M5.Lcd.fillCircle(" + x + ", " + y + ", " + radius + ", " + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdFillCircleBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.RADIUS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.COLOR]: {
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
                [LcdFillCircleBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.RADIUS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdFillCircleBlock.COLOR]: {
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