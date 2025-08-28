import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

type OperatorOption = keyof typeof OPERATORS;
const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>=',
};

export class CompareBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "logic_compare";
    public static readonly OPERATOR: string = "OP";
    public static readonly ARGUMENT_A: string = "A";
    public static readonly ARGUMENT_B: string = "B";

    protected identifier(): string {
        return CompareBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const operator = OPERATORS[block.getFieldValue(CompareBlock.OPERATOR) as OperatorOption];

        const arg1 = generator.valueToCode(block, CompareBlock.ARGUMENT_A, Order.NONE) || 0;
        const arg2 = generator.valueToCode(block, CompareBlock.ARGUMENT_B, Order.NONE) || 0;

        const code = arg1 + ' ' + operator + ' ' + arg2;

        return [code, Order.NONE]
    }

}