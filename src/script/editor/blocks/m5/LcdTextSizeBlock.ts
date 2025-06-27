import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const SIZE = "SIZE";

export class LcdTextSizeBlock extends CodeBlock {
    protected identifier(): string {
        return "m5-lcd-size";
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(SIZE)
                    .appendField('set LCD text size ')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const size = generator.valueToCode(block, SIZE, Order.NONE);

        return "M5.Lcd.setTextSize(" + size + ");";
    }
}