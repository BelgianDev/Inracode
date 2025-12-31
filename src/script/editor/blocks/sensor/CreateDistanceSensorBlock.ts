import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class CreateDistanceSensor extends CodeBlock {
    public static readonly IDENTIFIER: string = "distance-sensor-create";
    public static readonly NAME: string = "NAME";
    public static readonly WRITE_PIN: string = "WRITE_PIN";
    public static readonly READ_PIN: string = "READ_PIN";

    public identifier(): string {
        return CreateDistanceSensor.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.SENSORS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(CreateDistanceSensor.WRITE_PIN)
                    .appendField('create ultrasonic distance sensor with name')
                    .appendField(new Blockly.FieldTextInput('mySensor'), CreateDistanceSensor.NAME)
                    .appendField('write pin')
                this.appendValueInput(CreateDistanceSensor.READ_PIN)
                    .appendField('read pin')

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
        const name = block.getFieldValue(CreateDistanceSensor.NAME);

        const writePin = generator.valueToCode(block, CreateDistanceSensor.WRITE_PIN, Order.NONE);
        const readPin = generator.valueToCode(block, CreateDistanceSensor.READ_PIN, Order.NONE);

        return "UltraSonicDistanceSensor " + name + "(" + writePin + ", " + readPin + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [CreateDistanceSensor.WRITE_PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1
                        }
                    }
                },
                [CreateDistanceSensor.READ_PIN]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 2
                        }
                    }
                }
            }
        })
    }
}