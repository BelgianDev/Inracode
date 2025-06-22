import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const STATEMENT = "BOOL";

export class NegateBlock extends StandardBlock {
    protected identifier(): string {
        return "logic_negate";
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const condition = generator.valueToCode(block, STATEMENT, Order.NONE);

        const code = "!(" + condition + ")";
        return [code, Order.NONE]
    }

}