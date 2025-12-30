import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class SetServoAngleBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-set-angle";
    public static readonly ANGLE: string = "ANGLE";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return SetServoAngleBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('set angle of servo')
                    .appendField(new Blockly.FieldTextInput('myServo'), SetServoAngleBlock.NAME);
                this.appendValueInput(SetServoAngleBlock.ANGLE)
                    .appendField('to')
                this.appendDummyInput()
                    .appendField("degrees")

                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(SetServoAngleBlock.NAME);
        const angle = generator.valueToCode(block, SetServoAngleBlock.ANGLE, Order.NONE);

        return name + ".write(" + angle + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SetServoAngleBlock.ANGLE]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 90
                        }
                    }
                }
            }
        })
    }
}