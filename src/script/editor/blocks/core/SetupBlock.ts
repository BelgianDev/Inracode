import {CodeBlock} from "../../CodeBlock.ts";
import {type Block, CodeGenerator} from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class SetupBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-setup";
    public static readonly MEMBERS: string = "MEMBERS";

    protected identifier(): string {
        return SetupBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput().appendField('setup');
                this.appendStatementInput(SetupBlock.MEMBERS)
                this.appendEndRowInput();
            }
        }
    }

    protected generateCode(block: Block, generator: CodeGenerator): string | [string, number] {
        const statementMembers = generator.statementToCode(block, SetupBlock.MEMBERS);

        return '\nvoid setup() {\n' + statementMembers + '\n}';
    }
}