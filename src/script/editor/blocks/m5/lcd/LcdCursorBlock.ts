import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class LcdCursorBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-cursor";
    public static readonly X: string = "X";
    public static readonly Y: string = "Y";

    public identifier(): string {
        return LcdCursorBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdCursorBlock.X)
                    .setCheck('Number')
                    .appendField('set LCD cursor to')
                    .appendField('X:');
                this.appendValueInput(LcdCursorBlock.Y)
                    .setCheck('Number')
                    .appendField('Y:');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const x = generator.valueToCode(block, LcdCursorBlock.X, Order.NONE);
        const y = generator.valueToCode(block, LcdCursorBlock.Y, Order.NONE);

        return "M5.Lcd.setCursor(" + x + ", " + y + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdCursorBlock.X]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                },
                [LcdCursorBlock.Y]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 0
                        }
                    }
                }
            }
        })
    }
}