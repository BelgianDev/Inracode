import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";

export class GetServoAttachedBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-get-attached";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return GetServoAttachedBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('servo')
                    .appendField(new Blockly.FieldTextInput('myServo'), GetServoAttachedBlock.NAME)
                    .appendField('is attached');

                this.setOutput(true, null);
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(GetServoAttachedBlock.NAME);
        return [name + ".attached()", Order.NONE];
    }
}