import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class GetServoAngleBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-get-angle";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return GetServoAngleBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('get angle of servo')
                    .appendField(new Blockly.FieldTextInput('myServo'), GetServoAngleBlock.NAME);

                this.setOutput(true, null);
            }
        }
    }

    //@ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(GetServoAngleBlock.NAME);
        return [name + ".read()", Order.NONE];
    }
}