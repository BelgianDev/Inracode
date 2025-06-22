import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

const VAR_NAME = "VAR_NAME";
const VAR_VALUE = "VAR_VALUE";

export class SetVariableBlock extends CodeBlock {
    protected identifier(): string {
        return "var-set";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('set')
                    .appendField(new Blockly.FieldTextInput('variable'), VAR_NAME)
                    .appendField('to')
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

        if (isNaN(Number(value)) && value !== 'true' && value !== 'false') {
            return name + ' = "' + value + '";';
        }

        return name + " = " + value + ";";
    }
}