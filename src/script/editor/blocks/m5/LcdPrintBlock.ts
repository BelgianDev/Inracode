import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

const INPUT = "INPUT";

export class LcdPrintBlock extends CodeBlock {
    protected identifier(): string {
        return "m5-lcd-print";
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('print ')
                    .appendField(new Blockly.FieldTextInput('text'), INPUT)
                    .appendField('to LCD screen.')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = block.getFieldValue(INPUT);

        return 'M5.Lcd.print("' +  input + '");';
    }
}