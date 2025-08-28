import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
import type {BlockDefinition} from "blockly/core/blocks";

export class IncludeBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-include";
    public static readonly INCLUDE_PATH: string = "INCLUDE_PATH";

    protected identifier(): string {
        return IncludeBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('include')
                    .appendField(new Blockly.FieldTextInput('M5Stack.h'), IncludeBlock.INCLUDE_PATH);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(225);
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const path = block.getFieldValue(IncludeBlock.INCLUDE_PATH);

        return "#include <" + path + ">";
    }
}