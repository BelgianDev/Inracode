
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

export class LcdFillScreenBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-fill-screen";
    public static readonly COLOR: string = "COLOR";

    public identifier(): string {
        return LcdFillScreenBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdFillScreenBlock.COLOR)
                    .appendField('fill the LCD screen with color')
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const color = generator.valueToCode(block, LcdFillScreenBlock.COLOR, Order.NONE);
        return "M5.Lcd.fillScreen(" + color + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdFillScreenBlock.COLOR]: {
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
                [LcdFillScreenBlock.COLOR]: {
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