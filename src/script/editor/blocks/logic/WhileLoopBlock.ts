import {CodeBlock} from "../../CodeBlock.ts";
import {type Block, CodeGenerator} from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class WhileLoopBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "logic-while";
    public static readonly STATEMENT: string = "MEMBERS";
    public static readonly CONDITION: string = "CONDITION";

    protected identifier(): string {
        return WhileLoopBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(WhileLoopBlock.CONDITION)
                    .appendField('while');
                this.appendStatementInput(WhileLoopBlock.STATEMENT)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.appendEndRowInput();
            }
        }
    }

    protected generateCode(block: Block, generator: CodeGenerator): string | [string, number] {
        const condition = generator.valueToCode(block, WhileLoopBlock.CONDITION, Order.NONE);
        const statementMembers = generator.statementToCode(block, WhileLoopBlock.STATEMENT);

        return 'while(' + condition + ') {\n' + statementMembers + '\n}';
    }
}