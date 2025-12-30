import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class CreateServoBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "servo-create";
    public static readonly NAME: string = "NAME";

    public identifier(): string {
        return CreateServoBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.ESP32_SERVO;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('create servo with name')
                    .appendField(new Blockly.FieldTextInput('myServo'), CreateServoBlock.NAME);
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const name = block.getFieldValue(CreateServoBlock.NAME);

        return "Servo " + name + ";";
    }
}