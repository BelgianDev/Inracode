import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class BeginBlock extends CodeBlock {
    protected identifier(): string {
        return "m5-begin";
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('Start the M5Stack');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "M5.begin();";
    }
}