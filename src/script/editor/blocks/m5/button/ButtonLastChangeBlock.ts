import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

const BUTTONS = {
    'A': 'BtnA',
    'B': 'BtnB',
    'C': 'BtnC'
};

export class ButtonLastChangeBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-button-last-change";

    public static readonly BUTTON: string = "BUTTON";

    public identifier(): string {
        return ButtonLastChangeBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_BTN;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('retrieve the last change of button')
                    .appendField(new Blockly.FieldDropdown(Object.entries(BUTTONS).map(([key, value]) => [key, value])), ButtonLastChangeBlock.BUTTON)
                this.setOutput(true, null);
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
           const button = block.getFieldValue(ButtonLastChangeBlock.BUTTON)

        return ["M5." + button + ".lastChange()", Order.NONE]
    }
}