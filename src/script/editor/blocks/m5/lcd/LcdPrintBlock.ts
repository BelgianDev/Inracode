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

export class LcdPrintBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-print";
    public static readonly INPUT: string = "INPUT"

    public identifier(): string {
        return LcdPrintBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(LcdPrintBlock.INPUT)
                    .appendField('print')
                this.appendDummyInput('')
                    .appendField('to LCD screen.');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = generator.valueToCode(block, LcdPrintBlock.INPUT, Order.NONE);

        return 'M5.Lcd.print(' +  input + ');';
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [LcdPrintBlock.INPUT]: {
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
                [LcdPrintBlock.INPUT]: {
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