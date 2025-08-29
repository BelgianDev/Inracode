import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

export class LcdTextSizeBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-size";
    public static readonly SIZE: string = "SIZE";

    protected identifier(): string {
        return LcdTextSizeBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdTextSizeBlock.SIZE)
                    .appendField('set LCD text size ')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const size = generator.valueToCode(block, LcdTextSizeBlock.SIZE, Order.NONE);
        return "M5.Lcd.setTextSize(" + size + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdTextSizeBlock.SIZE]: {
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