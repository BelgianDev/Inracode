import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class SetVariableBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "var-set";
    public static readonly VAR_NAME: string = "VAR_NAME";
    public static readonly VAR_VALUE: string = "VAR_VALUE";

    protected identifier(): string {
        return SetVariableBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(SetVariableBlock.VAR_VALUE)
                    .appendField('set')
                    .appendField(new Blockly.FieldTextInput('variable'), SetVariableBlock.VAR_NAME)
                    .appendField('to');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(SetVariableBlock.VAR_NAME);
        const value = generator.valueToCode(block, SetVariableBlock.VAR_VALUE, Order.NONE)

        return name + " = " + value + ";";
    }
}