import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

const VAR_NAME = "VAR_NAME";
const VAR_VALUE = "VAR_VALUE";

export class DefineBlock extends CodeBlock {
    protected identifier(): string {
        return "core-define";
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('define')
                    .appendField(new Blockly.FieldTextInput('CONSTANT'), VAR_NAME)
                    .appendField('as')
                    .appendField(new Blockly.FieldTextInput(''), VAR_VALUE);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(VAR_NAME);
        const value = block.getFieldValue(VAR_VALUE);



        return "#define " + name + " " + value;
    }
}