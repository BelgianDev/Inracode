import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class GetSensorDistanceBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "distance-sensor-get-distance";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return GetSensorDistanceBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.SENSORS;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('measure the distance from')
                    .appendField(new Blockly.FieldTextInput('mySensor'), GetSensorDistanceBlock.NAME)
                    .appendField('in centimeters');

                this.setOutput(true, null);
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(GetSensorDistanceBlock.NAME);
        return [name + ".measureDistanceCm()", Order.NONE];
    }
}