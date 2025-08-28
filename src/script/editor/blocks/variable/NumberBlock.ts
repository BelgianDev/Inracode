import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class NumberBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "math_number";
    public static readonly NUM: string = "NUM";

    protected identifier(): string {
        return NumberBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const number = block.getFieldValue(NumberBlock.NUM);
        return ["" + number, Order.NONE];
    }

}