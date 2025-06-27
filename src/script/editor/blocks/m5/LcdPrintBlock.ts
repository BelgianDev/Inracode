import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

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
                this.appendValueInput(INPUT)
                    .appendField('print')
                this.appendDummyInput('')
                    .appendField('to LCD screen.');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = generator.valueToCode(block, INPUT, Order.NONE);

        return 'M5.Lcd.print(' +  input + ');';
    }
}