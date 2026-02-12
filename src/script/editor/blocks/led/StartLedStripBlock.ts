import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class StartLedStripBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "led-strip-begin";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return StartLedStripBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.NEO_PIXEL_LED_STRIP;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput()
                    .appendField('start LED strip')
                    .appendField(new Blockly.FieldTextInput('myStrip'), StartLedStripBlock.NAME)

                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(StartLedStripBlock.NAME);

        return name + ".begin();";
    }
}