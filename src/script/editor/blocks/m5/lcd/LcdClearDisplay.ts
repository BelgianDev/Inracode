import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

// Personal choice, that the clear display doesn't use any color arguments, to force the user to use the fillScreen block instead.
export class LcdClearDisplay extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-clear-display";

    public identifier(): string {
        return LcdClearDisplay.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_GRAPHICS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField("Clear the display")
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    //@ts-expect-error
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return "M5.Lcd.clearDisplay();"; // Without any args will fallback to using black.
    }
}