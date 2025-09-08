import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

type OperatorOption = keyof typeof OPERATORS;
const OPERATORS = {
    'ADD': '+',
    'MINUS': '-',
    'MULTIPLY': '*',
    'DIVIDE': '/',
    'POWER': '^'
};

export class ArithmeticBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "math_arithmetic";
    public static readonly OPERATOR: string = "OP";
    public static readonly ARGUMENT_A: string = "A";
    public static readonly ARGUMENT_B: string = "B";

    protected identifier(): string {
        return ArithmeticBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.MATH;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const operator = OPERATORS[block.getFieldValue(ArithmeticBlock.OPERATOR) as OperatorOption];

        const arg1 = generator.valueToCode(block, ArithmeticBlock.ARGUMENT_A, Order.NONE) || 0;
        const arg2 = generator.valueToCode(block, ArithmeticBlock.ARGUMENT_B, Order.NONE) || 0;

        const code = arg1 + ' ' + operator + ' ' + arg2;

        return [code, Order.NONE]
    }

}