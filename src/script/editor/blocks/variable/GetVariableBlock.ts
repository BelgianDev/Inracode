import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const VAR_NAME = "VAR_NAME";

export class GetVariableBlock extends CodeBlock {
    protected identifier(): string {
        return "var-get";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('get')
                    .appendField(new Blockly.FieldTextInput('variable'), VAR_NAME);
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(VAR_NAME);
        return [name, Order.NONE];
    }
}