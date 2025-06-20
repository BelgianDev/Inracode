import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const NUM = "NUM";

export class NumberBlock extends StandardBlock {
    protected identifier(): string {
        return "math_number";
    }

    protected category(): CategoryInfo {
        return Categories.MATH;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return [block.getFieldValue(NUM), Order.NONE];
    }

}