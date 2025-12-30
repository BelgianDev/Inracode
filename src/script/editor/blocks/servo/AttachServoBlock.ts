import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class AttachServoBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-attach";
    public static readonly NAME: string = "NAME";
    public static readonly PIN: string = "PIN";

    public identifier(): string {
        return AttachServoBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('attach servo')
                    .appendField(new Blockly.FieldTextInput('myServo'), AttachServoBlock.NAME);
                this.appendValueInput(AttachServoBlock.PIN)
                    .appendField('to pin')

                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(AttachServoBlock.NAME);
        const pin = generator.valueToCode(block, AttachServoBlock.PIN, Order.NONE);

        return name + ".attach(" + pin + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [AttachServoBlock.PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                }
            }
        })
    }
}