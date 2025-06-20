import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

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
                this.appendDummyInput('')
                    .appendField('Move LCD cursor to X:')
                    .appendField(new Blockly.FieldNumber(0), X)
                    .appendField('Y:')
                    .appendField(new Blockly.FieldNumber(0), Y);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const x = block.getFieldValue(X);
        const y = block.getFieldValue(Y);

        return "M5.Lcd.setCursor(" + x + ", " + y + ");";
    }
}