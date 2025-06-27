import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const VAR_NAME = "VAR_NAME";
const VAR_TYPE = "VAR_TYPE";
const VAR_VALUE = "VAR_VALUE";

export class DefineVariableBlock extends CodeBlock {
    protected identifier(): string {
        return "var-define";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(VAR_VALUE)
                    .appendField('define variable')
                    .appendField(new Blockly.FieldTextInput('variable'), VAR_NAME)
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
                    ]), VAR_TYPE)
                    .appendField('as')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(VAR_NAME);
        const type = block.getFieldValue(VAR_TYPE);
        const value = generator.valueToCode(block, VAR_VALUE, Order.NONE);

        if (!value || value.length === 0)
            return type + ' ' + name + ';';

        const isText = type === 'String'

        if (!isText)
            return type + " " + name + ' = ' + value + ';';

        return type + ' ' + name + ' = "' + value + '";';
    }
}