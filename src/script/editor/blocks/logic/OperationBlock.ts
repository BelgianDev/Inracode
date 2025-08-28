import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

type OperatorOption = keyof typeof OPERATORS;
const OPERATORS = {
    'AND': '&&',
    'OR': '||'
};

export class OperationBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "logic_operation";
    public static readonly OPERATOR: string = "OP";
    public static readonly ARGUMENT_A: string = "A";
    public static readonly ARGUMENT_B: string = "B";

    protected identifier(): string {
        return OperationBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const operator = OPERATORS[block.getFieldValue(OperationBlock.OPERATOR) as OperatorOption];

        const arg1 = generator.valueToCode(block, OperationBlock.ARGUMENT_A, Order.NONE) || '';
        const arg2 = generator.valueToCode(block, OperationBlock.ARGUMENT_B, Order.NONE) || '';

        const code = '(' + arg1 + ') ' + operator + ' (' + arg2 + ')';

        return [code, Order.NONE]
    }

}