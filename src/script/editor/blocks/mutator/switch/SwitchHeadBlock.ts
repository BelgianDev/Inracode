// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {MutatorBlock} from "../MutatorBlock.ts";

export class SwitchHeadBlock extends MutatorBlock {
    public static readonly IDENTIFIER: string = "switch-head";

    public identifier(): string {
        return SwitchHeadBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('switch');
                this.setPreviousStatement(false, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }
}