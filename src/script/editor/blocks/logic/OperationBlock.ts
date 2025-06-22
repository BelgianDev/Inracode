import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const OP = "OP";
const ARGUMENT_A = "A";
const ARGUMENT_B = "B";

type OperatorOption = keyof typeof OPERATORS;
const OPERATORS = {
    'AND': '&&',
    'OR': '||'
};

export class OperationBlock extends StandardBlock {
    protected identifier(): string {
        return "logic_operation";
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const operator = OPERATORS[block.getFieldValue(OP) as OperatorOption];

        const arg1 = generator.valueToCode(block, ARGUMENT_A, Order.NONE) || '';
        const arg2 = generator.valueToCode(block, ARGUMENT_B, Order.NONE) || '';

        const code = '(' + arg1 + ') ' + operator + ' (' + arg2 + ')';

        return [code, Order.NONE]
    }

}