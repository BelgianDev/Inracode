import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class SetServoAngleMicroBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-set-angle-micro";
    public static readonly TIME: string = "ANGLE";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return SetServoAngleMicroBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('send a pulse to')
                    .appendField(new Blockly.FieldTextInput('myServo'), SetServoAngleMicroBlock.NAME);
                this.appendValueInput(SetServoAngleMicroBlock.TIME)
                    .appendField('for')
                this.appendDummyInput()
                    .appendField("microseconds to set the servo angle.")

                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(SetServoAngleMicroBlock.NAME);
        const time = generator.valueToCode(block, SetServoAngleMicroBlock.TIME, Order.NONE);

        return name + ".writeMicroseconds(" + time + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SetServoAngleMicroBlock.TIME]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1500
                        }
                    }
                }
            }
        })
    }
}