import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {TextBlock} from "../../variable/TextBlock.ts";
import {GetVariableBlock} from "../../variable/GetVariableBlock.ts";

export class SerialPrintLineBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-serial-println";
    public static readonly INPUT: string = "INPUT"

    public identifier(): string {
        return SerialPrintLineBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_SERIAL;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(SerialPrintLineBlock.INPUT)
                    .appendField('print line')
                this.appendDummyInput('')
                    .appendField('to serial output.');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = generator.valueToCode(block, SerialPrintLineBlock.INPUT, Order.NONE);

        return 'Serial.println(' +  input + ');';
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SerialPrintLineBlock.INPUT]: {
                    "block": {
                        "type": TextBlock.IDENTIFIER,
                        "fields": {
                            [TextBlock.INPUT]: "Hello World!"
                        }
                    }
                }
            }
        })

        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SerialPrintLineBlock.INPUT]: {
                    "block": {
                        "type": GetVariableBlock.IDENTIFIER,
                        "fields": {
                            [GetVariableBlock.VAR_NAME]: "variable"
                        }
                    }
                }
            }
        })
    }
}