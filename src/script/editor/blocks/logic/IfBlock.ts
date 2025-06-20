import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

const IF_MEMBER = "IF";
const DO_MEMBER = "DO";
const ELSE_MEMBER = "ELSE";

export class IfBlock extends StandardBlock {
    protected identifier(): string {
        return "controls_if";
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        let count = 0;
        let code = '';

        let condition;
        while ((condition = block.getInput(IF_MEMBER + count)) !== null) {
            const conditionCode = generator.valueToCode(block, IF_MEMBER + count, Order.NONE);
            const statementCode = generator.statementToCode(block, DO_MEMBER + count);

            code +=
                (count > 0 ? ' else ' : '') +
                'if (' + conditionCode + ') {\n' +
                statementCode +
                '\n}';

            count++;
        }

        if (block.getInput(ELSE_MEMBER)) {
            const statementCode = generator.statementToCode(block, ELSE_MEMBER);
            code += ' else {\n' + statementCode + '\n}';
        }

        return code;
    }

}