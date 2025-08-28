import {CodeBlock} from "../../CodeBlock.ts";
import {type Block, CodeGenerator} from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class GlobalBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-global";
    public static readonly MEMBERS: string = "MEMBERS";

    protected identifier(): string {
        return GlobalBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput().appendField('global');
                this.appendStatementInput(GlobalBlock.MEMBERS)
                this.appendEndRowInput();
            }
        }
    }

    protected generateCode(block: Block, generator: CodeGenerator): string | [string, number] {
        const statementMembers = generator.statementToCode(block, GlobalBlock.MEMBERS);

        return statementMembers.replace(/^ {2}/gm, '');
    }
}