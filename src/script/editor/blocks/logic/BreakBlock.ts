import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class BreakBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "controls_flow_break";

    protected identifier(): string {
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

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "break;";
    }
}