import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const INPUT = "TEXT";

export class TextBlock extends StandardBlock {
    protected identifier(): string {
        return "text";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = block.getFieldValue(INPUT);

        const code = '"' + input + '"';
        return [code, Order.NONE]
    }

}