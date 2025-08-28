import {CodeBlock} from "../../CodeBlock.ts";
import {type Block, CodeGenerator} from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class LoopBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-loop";
    public static readonly MEMBERS: string = "MEMBERS";

    protected identifier(): string {
        return LoopBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput().appendField('loop');
                this.appendStatementInput(LoopBlock.MEMBERS)
                this.appendEndRowInput();
            }
        }
    }

    protected generateCode(block: Block, generator: CodeGenerator): string | [string, number] {
        const statementMembers = generator.statementToCode(block, LoopBlock.MEMBERS);

        return '\nvoid loop() {\n' + statementMembers + '\n}';
    }
}