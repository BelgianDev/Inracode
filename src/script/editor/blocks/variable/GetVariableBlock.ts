import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class GetVariableBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "var-get";
    public static readonly VAR_NAME: string = "VAR_NAME";

    protected identifier(): string {
        return GetVariableBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField(new Blockly.FieldTextInput('variable'), GetVariableBlock.VAR_NAME);
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(GetVariableBlock.VAR_NAME);
        return [name, Order.NONE];
    }
}