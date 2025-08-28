import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class DefineVariableBlock extends CodeBlock {
    private static readonly IDENTIFIER: string = "var-define";
    private static readonly VAR_NAME: string = "VAR_NAME";
    private static readonly VAR_TYPE: string = "VAR_TYPE";
    private static readonly VAR_VALUE: string = "VAR_VALUE";

    protected identifier(): string {
        return DefineVariableBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(DefineVariableBlock.VAR_VALUE)
                    .appendField('define variable')
                    .appendField(new Blockly.FieldTextInput('variable'), DefineVariableBlock.VAR_NAME)
                    .appendField('of type')
                    .appendField(new Blockly.FieldDropdown([
                        ['Boolean', 'bool'],
                        ['String', 'String'],
                        ['Character', 'signed char'],
                        ['Unsigned Character', 'unsigned char'],
                        ['Integer', 'int'],
                        ['Unsigned Integer', 'unsigned int'],
                        ['Long', 'long'],
                        ['Unsigned Long', 'unsigned long'],
                        ['Float', 'float'],
                        ['Double', 'double']
                    ]), DefineVariableBlock.VAR_TYPE)
                    .appendField('as')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(DefineVariableBlock.VAR_NAME);
        const type = block.getFieldValue(DefineVariableBlock.VAR_TYPE);
        const value = generator.valueToCode(block, DefineVariableBlock.VAR_VALUE, Order.NONE);

        if (!value || value.length === 0)
            return type + ' ' + name + ';';

        const isText = type === 'String'

        if (!isText)
            return type + " " + name + ' = ' + value + ';';

        return type + ' ' + name + ' = "' + value + '";';
    }
}