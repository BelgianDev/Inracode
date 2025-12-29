import {StandardBlock} from "../StandardBlock.ts";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class BooleanBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "logic_boolean";
    public static readonly BOOLEAN: string = "BOOL";

    public identifier(): string {
        return BooleanBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const code = block.getFieldValue(BooleanBlock.BOOLEAN).toLowerCase();
        return [code, Order.NONE]
    }

}