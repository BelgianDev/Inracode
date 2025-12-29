// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly/core';
import {Categories} from "../../Categories.ts";
import {CodeBlock} from "../../CodeBlock.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class SwitchBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "switch";
    public static readonly SWITCH_MUTATOR: string = "switch_mutator";

    public static readonly SWITCH_MEMBER: string = "SWITCH";
    public static readonly CASE_MEMBER: string = "CASE";
    public static readonly DEFAULT_MEMBER: string = "DEFAULT";
    public static readonly DO_MEMBER: string = "DO";

    public identifier(): string {
        return SwitchBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.jsonInit({
                    type: SwitchBlock.IDENTIFIER,
                    mutator: SwitchBlock.SWITCH_MUTATOR,
                    message0: "switch %1",
                    args0: [
                        { type: "input_value", name: SwitchBlock.SWITCH_MEMBER }
                    ],
                    previousStatement: null,
                    nextStatement: null,
                });

                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const switchValue = generator.valueToCode(block, SwitchBlock.SWITCH_MEMBER, Order.NONE);

        let count = 0;
        let code = 'switch (' + switchValue + ') {\n';

        while (block.getInput(SwitchBlock.CASE_MEMBER + count) !== null) {
            const match = generator.valueToCode(block, SwitchBlock.CASE_MEMBER + count, Order.NONE);
            const statementCode = generator.statementToCode(block, SwitchBlock.DO_MEMBER + count);

            code += 'case ' + match + ':\n' + statementCode + '\n';

            count++;
        }

        if (block.getInput(SwitchBlock.DEFAULT_MEMBER)) {
            const statementCode = generator.statementToCode(block, SwitchBlock.DEFAULT_MEMBER);
            code += 'default:\n' + statementCode + '\n';
        }

        code += '}';
        return code;
    }
}