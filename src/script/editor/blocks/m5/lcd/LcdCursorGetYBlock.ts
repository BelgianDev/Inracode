import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class LcdCursorGetYBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-cursor-get-y";

    public identifier(): string {
        return LcdCursorGetYBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_TEXT;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField('get LCD cursor Y')
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "M5.Lcd.getCursorY()";
    }
}