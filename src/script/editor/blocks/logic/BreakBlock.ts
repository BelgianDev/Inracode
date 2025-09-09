// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class BreakBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "controls_flow_break";

    public identifier(): string {
        return BreakBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('break');
                this.setPreviousStatement(true, null);
                this.setNextStatement(false, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "break;";
    }
}