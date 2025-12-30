import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class GetServoMicroBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-get-angle-micro";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return GetServoMicroBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('get pulse of')
                    .appendField(new Blockly.FieldTextInput('myServo'), GetServoMicroBlock.NAME)
                    .appendField('in microseconds');

                this.setOutput(true, null);
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(GetServoMicroBlock.NAME);
        return [name + ".readMicroseconds()", Order.NONE];
    }
}