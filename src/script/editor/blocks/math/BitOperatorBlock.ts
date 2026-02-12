
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

type OperatorOption = keyof typeof OPERATORS;
const OPERATORS = {
    'LEFT_SHIFT': '<<',
    'RIGHT_SHIFT': '>>',
    'OR': '|',
    'AND': '&',
    'XOR': '^',
};

export class BitOperatorBlock extends CodeBlock{
    public static readonly IDENTIFIER: string = "math_bit_operator";
    public static readonly OPERATOR: string = "OP";
    public static readonly ARGUMENT_A: string = "A";
    public static readonly ARGUMENT_B: string = "B";

    public identifier(): string {
        return BitOperatorBlock.IDENTIFIER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(BitOperatorBlock.ARGUMENT_A)
                    .setAlign(Blockly.inputs.Align.CENTRE)
                    .setCheck('Number');
                this.appendDummyInput("NAME")
                    .setAlign(Blockly.inputs.Align.CENTRE)
                    .appendField(new Blockly.FieldDropdown([
                        ['<<', 'LEFT_SHIFT'],
                        ['>>', 'RIGHT_SHIFT'],
                        ['|', 'OR'],
                        ['&', 'AND'],
                        ['^', 'XOR'],
                    ]), BitOperatorBlock.OPERATOR);
                this.appendValueInput(BitOperatorBlock.ARGUMENT_B)
                    .setAlign(Blockly.inputs.Align.CENTRE)
                    .setCheck('Number');

                this.setInputsInline(true)
                this.setOutput(true, null);
                this.setTooltip('');
            }
        }
    }

    protected category(): CategoryInfo {
        return Categories.MATH;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const operator = OPERATORS[block.getFieldValue(BitOperatorBlock.OPERATOR) as OperatorOption];

        const arg1 = generator.valueToCode(block, BitOperatorBlock.ARGUMENT_A, Order.NONE) || 0;
        const arg2 = generator.valueToCode(block, BitOperatorBlock.ARGUMENT_B, Order.NONE) || 0;

        const code = arg1 + ' ' + operator + ' ' + arg2;

        return [code, Order.NONE]
    }

}