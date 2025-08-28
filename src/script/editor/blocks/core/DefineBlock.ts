import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class DefineBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-define";
    public static readonly VAR_NAME: string = "VAR_NAME";
    public static readonly VAR_VALUE: string = "VAR_VALUE";

    protected identifier(): string {
        return DefineBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(DefineBlock.VAR_VALUE)
                    .appendField('define')
                    .appendField(new Blockly.FieldTextInput('CONSTANT'), DefineBlock.VAR_NAME)
                    .appendField('as')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(DefineBlock.VAR_NAME);
        const value = generator.valueToCode(block, DefineBlock.VAR_VALUE, Order.NONE);

        return "#define " + name + " " + value;
    }
}