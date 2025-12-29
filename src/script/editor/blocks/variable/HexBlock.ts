// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class HexBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "variable-hex";
    public static readonly HEX: string = "HEX";

    public identifier(): string {
        return HexBlock.IDENTIFIER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('hex')
                    .appendField(new Blockly.FieldTextInput('00'), HexBlock.HEX);
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
        const hex = block.getFieldValue(HexBlock.HEX);
        return ["0x" + hex, Order.NONE];
    }

}