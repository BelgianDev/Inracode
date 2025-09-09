import {StandardBlock} from "../StandardBlock.ts";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class NumberBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "math_number";
    public static readonly NUM: string = "NUM";

    public identifier(): string {
        return NumberBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const number = block.getFieldValue(NumberBlock.NUM);
        return ["" + number, Order.NONE];
    }

}