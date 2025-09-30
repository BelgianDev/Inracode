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

export class ButtonWasReleasedBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-button-was-released";

    public static readonly BUTTON: string = "BUTTON";

    public identifier(): string {
        return ButtonWasReleasedBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_BTN;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('was button')
                    .appendField(new Blockly.FieldDropdown(Object.entries(BUTTONS).map(([key, value]) => [key, value])), ButtonWasReleasedBlock.BUTTON)
                    .appendField('released')
                this.setOutput(true, null);
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
           const button = block.getFieldValue(ButtonWasReleasedBlock.BUTTON)

        return ["M5." + button + ".wasReleased()", Order.NONE]
    }
}