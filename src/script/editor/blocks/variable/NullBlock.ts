import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class NullBlock extends StandardBlock {
    protected identifier(): string {
        return "logic_null";
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return ['NULL', Order.NONE];
    }

}