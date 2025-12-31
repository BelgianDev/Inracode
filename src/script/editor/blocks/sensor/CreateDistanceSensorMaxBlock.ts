import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class CreateDistanceSensorMaxBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "distance-sensor-create-max";
    public static readonly NAME: string = "NAME";
    public static readonly WRITE_PIN: string = "WRITE_PIN";
    public static readonly READ_PIN: string = "READ_PIN";
    public static readonly MAX_DISTANCE: string = "MAX_DISTANCE";
    public static readonly MAX_TIMEOUT: string = "MAX_TIMEOUT";

    public identifier(): string {
        return CreateDistanceSensorMaxBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.SENSORS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(CreateDistanceSensorMaxBlock.WRITE_PIN)
                    .appendField('create ultrasonic distance sensor with name')
                    .appendField(new Blockly.FieldTextInput('mySensor'), CreateDistanceSensorMaxBlock.NAME)
                    .appendField('write pin')
                this.appendValueInput(CreateDistanceSensorMaxBlock.READ_PIN)
                    .appendField('read pin')
                this.appendValueInput(CreateDistanceSensorMaxBlock.MAX_DISTANCE)
                    .appendField('maximum distance')
                this.appendValueInput(CreateDistanceSensorMaxBlock.MAX_TIMEOUT)
                    .appendField('centimeters with timeout of ')
                this.appendDummyInput()
                    .appendField('microseconds')


                this.setInputsInline(true);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(CreateDistanceSensorMaxBlock.NAME);

        const writePin = generator.valueToCode(block, CreateDistanceSensorMaxBlock.WRITE_PIN, Order.NONE);
        const readPin = generator.valueToCode(block, CreateDistanceSensorMaxBlock.READ_PIN, Order.NONE);
        const maxDistance = generator.valueToCode(block, CreateDistanceSensorMaxBlock.MAX_DISTANCE, Order.NONE);
        const maxTimeout = generator.valueToCode(block, CreateDistanceSensorMaxBlock.MAX_TIMEOUT, Order.NONE);

        return "UltraSonicDistanceSensor " + name + "(" + writePin + ", " + readPin + ", " + maxDistance + ", " + maxTimeout + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [CreateDistanceSensorMaxBlock.WRITE_PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [CreateDistanceSensorMaxBlock.READ_PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 2
                        }
                    }
                },
                [CreateDistanceSensorMaxBlock.MAX_DISTANCE]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 400
                        }
                    }
                },
                [CreateDistanceSensorMaxBlock.MAX_TIMEOUT]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 10000
                        }
                    }
                }
            }
        })
    }
}