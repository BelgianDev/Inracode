// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class ForILoopBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "for-i";
    public static readonly VARIABLE: string = "VARIABLE";
    public static readonly INITIAL_VALUE: string = "INITIAL_VALUE";
    public static readonly CONDITION: string = "CONDITION";
    public static readonly MODIFIER: string = "MODIFIER";
    public static readonly STATEMENT: string = "STATEMENT";

    public identifier(): string {
        return ForILoopBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(ForILoopBlock.VARIABLE)
                    .appendField('for variable');
                this.appendValueInput(ForILoopBlock.INITIAL_VALUE)
                    .appendField('with value');
                this.appendValueInput(ForILoopBlock.CONDITION)
                    .appendField('while');
                this.appendValueInput(ForILoopBlock.MODIFIER)
                    .appendField('apply');
                this.appendStatementInput(ForILoopBlock.STATEMENT);
                this.setInputsInline(true)

                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const variable = generator.valueToCode(block, ForILoopBlock.VARIABLE, Order.NONE);
        const initialValue = generator.valueToCode(block, ForILoopBlock.INITIAL_VALUE, Order.NONE);
        const condition = generator.valueToCode(block, ForILoopBlock.CONDITION, Order.NONE);
        const modifier = generator.valueToCode(block, ForILoopBlock.MODIFIER, Order.NONE);
        const statement = generator.statementToCode(block, ForILoopBlock.STATEMENT);

        return `for (${variable} = ${initialValue}; ${condition}; ${modifier}) {\n` + statement + '\n}';
    }
}