import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class LcdBrightnessBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-brightness";
    public static readonly BRIGHTNESS: string = "BRIGHTNESS";

    public identifier(): string {
        return LcdBrightnessBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_TEXT;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdBrightnessBlock.BRIGHTNESS)
                    .appendField('set LCD brightness to')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const brightness = generator.valueToCode(block, LcdBrightnessBlock.BRIGHTNESS, Order.NONE);
        return "M5.Lcd.setBrightness(" + brightness + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdBrightnessBlock.BRIGHTNESS]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 200
                        }
                    }
                }
            }
        })
    }
}