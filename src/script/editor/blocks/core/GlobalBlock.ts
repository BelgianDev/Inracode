import {CodeBlock} from "../../CodeBlock.ts";
import {type Block, CodeGenerator} from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const MEMBERS = "MEMBERS";

export class GlobalBlock extends CodeBlock {
    protected identifier(): string {
        return "core-global";
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput().appendField('global');
                this.appendStatementInput(MEMBERS)
                this.appendEndRowInput();
            }
        }
    }

    protected generateCode(block: Block, generator: CodeGenerator): string | [string, number] {
        const statementMembers = generator.statementToCode(block, MEMBERS);

        return statementMembers.replace(/^ {2}/gm, '');
    }
}