import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

const INCLUDE_PATH = "INCLUDE_PATH";

export class IncludeBlock extends CodeBlock {
    protected identifier(): string {
        return "core-include";
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('Include')
                    .appendField(new Blockly.FieldTextInput('M5Stack.h'), INCLUDE_PATH);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(225);
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const path = block.getFieldValue(INCLUDE_PATH);

        return "#include <" + path + ">;";
    }
}