import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class TextBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "text";
    public static readonly INPUT: string = "TEXT";

    protected identifier(): string {
        return TextBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = block.getFieldValue(TextBlock.INPUT);

        const code = '"' + input + '"';
        return [code, Order.NONE]
    }

}