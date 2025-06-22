import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const BOOLEAN = "BOOL";

export class BooleanBlock extends StandardBlock {
    protected identifier(): string {
        return "logic_boolean";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const code = block.getFieldValue(BOOLEAN).toLowerCase();

        return [code, Order.NONE]
    }

}