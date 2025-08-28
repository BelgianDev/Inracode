import {StandardBlock} from "../StandardBlock.ts";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class IfBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "controls_if";
    public static readonly IF_MEMBER: string = "IF";
    public static readonly DO_MEMBER: string = "DO";
    public static readonly ELSE_MEMBER: string = "ELSE";

    protected identifier(): string {
        return IfBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        let count = 0;
        let code = '';

        while (block.getInput(IfBlock.IF_MEMBER + count) !== null) {
            const conditionCode = generator.valueToCode(block, IfBlock.IF_MEMBER + count, Order.NONE);
            const statementCode = generator.statementToCode(block, IfBlock.DO_MEMBER + count);

            code +=
                (count > 0 ? ' else ' : '') +
                'if (' + conditionCode + ') {\n' +
                statementCode +
                '\n}';

            count++;
        }

        if (block.getInput(IfBlock.ELSE_MEMBER)) {
            const statementCode = generator.statementToCode(block, IfBlock.ELSE_MEMBER);
            code += ' else {\n' + statementCode + '\n}';
        }

        return code;
    }

}