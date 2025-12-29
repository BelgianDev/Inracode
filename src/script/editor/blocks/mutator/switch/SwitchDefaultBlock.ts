// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {MutatorBlock} from "../MutatorBlock.ts";

export class SwitchDefaultBlock extends MutatorBlock {
    public static readonly IDENTIFIER: string = "switch-default";

    public identifier(): string {
        return SwitchDefaultBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.LOGIC;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('default');
                this.setPreviousStatement(true, null);
                this.setNextStatement(false, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }
}