import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly"
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class UpdateBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-update";

    public identifier(): string {
        return UpdateBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('update the M5Stack');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "M5.update();";
    }
}