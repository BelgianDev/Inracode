import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly"
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class SpeakerMuteBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-speaker-mute";

    public identifier(): string {
        return SpeakerMuteBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_SPEAKER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('').appendField('mute the speaker');
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "M5.Speaker.mute();";
    }
}