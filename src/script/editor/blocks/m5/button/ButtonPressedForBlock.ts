import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../../variable/NumberBlock.ts";

const BUTTONS = {
    'A': 'BtnA',
    'B': 'BtnB',
    'C': 'BtnC'
};

// FIXME: The block is called 'releasefor' inside the M5Stack library, unclear whether they meant 'released', confirm the usage of the block.
export class ButtonPressedForBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-button-pressed-for";

    public static readonly BUTTON: string = "BUTTON";
    public static readonly DURATION: string = "DURATION";

    public identifier(): string {
        return ButtonPressedForBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_BTN;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('is button')
                    .appendField(new Blockly.FieldDropdown(Object.entries(BUTTONS).map(([key, value]) => [key, value])), ButtonPressedForBlock.BUTTON)
                this.appendValueInput(ButtonPressedForBlock.DURATION)
                    .appendField('pressed for')
                this.appendDummyInput('').appendField('ms')

                this.setInputsInline(true);
                this.setOutput(true, null);
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const button = block.getFieldValue(ButtonPressedForBlock.BUTTON);
        const duration = generator.valueToCode(block, ButtonPressedForBlock.DURATION, Order.NONE);

        return ["M5." + button + ".pressedFor(" + duration + ");", Order.NONE]
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [ButtonPressedForBlock.DURATION]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 100
                        }
                    }
                }
            }
        })
    }
}