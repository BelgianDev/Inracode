import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class IncludeBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-include";
    public static readonly INCLUDE_PATH: string = "INCLUDE_PATH";
    public static readonly TYPE: string = "TYPE";

    public static readonly TYPE_LIBRARY: string = "libs";
    public static readonly TYPE_FILE: string = "file";

    public identifier(): string {
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
                    .appendField(new Blockly.FieldTextInput('M5Stack.h'), IncludeBlock.INCLUDE_PATH)
                    .appendField("from")
                    .appendField(new Blockly.FieldDropdown([
                        ["Library", IncludeBlock.TYPE_LIBRARY],
                        ["Project file", IncludeBlock.TYPE_FILE],
                    ]), IncludeBlock.TYPE)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(225);
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const path = block.getFieldValue(IncludeBlock.INCLUDE_PATH);
        const type = block.getFieldValue(IncludeBlock.TYPE);

        return type === IncludeBlock.TYPE_LIBRARY ? "#include <" + path + ">" : "#include \"" + path + "\"";
    }
}