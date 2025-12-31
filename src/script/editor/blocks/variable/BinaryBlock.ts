// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class BinaryBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "variable-bin";
    public static readonly BINARY: string = "BINARY";

    public identifier(): string {
        return BinaryBlock.IDENTIFIER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('binary')
                    .appendField(new Blockly.FieldTextInput('00000000'), BinaryBlock.BINARY);
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const hex = block.getFieldValue(BinaryBlock.BINARY);
        return ["0b" + hex, Order.NONE];
    }

}