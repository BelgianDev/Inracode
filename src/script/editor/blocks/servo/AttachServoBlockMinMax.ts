import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";
import {AttachServoBlock} from "./AttachServoBlock.ts";

export class AttachServoMinMaxBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-attach-min-max";
    public static readonly MIN: string = "MIN";
    public static readonly MAX: string = "MAX";
    public static readonly NAME: string = "NAME";
    public static readonly PIN: string = "PIN";

    public identifier(): string {
        return AttachServoMinMaxBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('attach servo')
                    .appendField(new Blockly.FieldTextInput('myServo'), AttachServoMinMaxBlock.NAME);
                this.appendValueInput(AttachServoMinMaxBlock.PIN)
                    .appendField('to pin')
                this.appendValueInput(AttachServoMinMaxBlock.MIN)
                    .appendField('with minimum angle')
                this.appendValueInput(AttachServoMinMaxBlock.MAX)
                    .appendField('and maximum angle');

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

        const min = generator.valueToCode(block, AttachServoMinMaxBlock.MIN, Order.NONE);
        const max = generator.valueToCode(block, AttachServoMinMaxBlock.MAX, Order.NONE);

        return name + ".attach(" + pin + ", " + min + ", " + max + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [AttachServoMinMaxBlock.PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [AttachServoMinMaxBlock.MIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: -180
                        }
                    }
                },
                [AttachServoMinMaxBlock.MAX]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 180
                        }
                    }
                }
            }
        })
    }
}