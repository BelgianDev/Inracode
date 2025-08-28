import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class NegateBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "logic_negate";
    public static readonly STATEMENT: string = "BOOL";

    protected identifier(): string {
        return NegateBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const condition = generator.valueToCode(block, NegateBlock.STATEMENT, Order.NONE);

        const code = "!(" + condition + ")";
        return [code, Order.NONE]
    }

}