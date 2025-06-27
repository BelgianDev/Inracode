import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const X = "X";
const Y = "Y";

export class LcdCursorBlock extends CodeBlock {
    protected identifier(): string {
        return "m5-lcd-cursor";
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(X)
                    .setCheck('Number')
                    .appendField('set LCD cursor to')
                    .appendField('X:');
                this.appendValueInput(Y)
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
        const x = generator.valueToCode(block, X, Order.NONE);
        const y = generator.valueToCode(block, Y, Order.NONE);

        return "M5.Lcd.setCursor(" + x + ", " + y + ");";
    }
}