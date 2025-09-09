import {StandardBlock} from "../StandardBlock.ts";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";

export class ForILoopBlock extends StandardBlock {
    public static readonly IDENTIFIER: string = "controls_repeat_ext";
    public static readonly TIMES: string = "TIMES";
    public static readonly STATEMENT: string = "DO";

    public identifier(): string {
        return ForILoopBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const times = generator.valueToCode(block, ForILoopBlock.TIMES, Order.NONE);
        const statement = generator.statementToCode(block, ForILoopBlock.STATEMENT);

        return "for (let i = 0; i < " + times + "; i++) {\n" + statement + "\n}"
    }
}