import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {TextBlock} from "../../variable/TextBlock.ts";

export class SerialPrintFormatBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-serial-print-format-";
    public static readonly INPUT: string = "INPUT"
    public static readonly ARGUMENT: string = "ARG";

    private readonly argNum: number;

    public constructor(argNum: number) {
        super()
        this.argNum = argNum;
    }

    public identifier(): string {
        return SerialPrintFormatBlock.IDENTIFIER + this.argNum;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_SERIAL;
    }

    protected definition(): BlockDefinition {
        const argNum = this.argNum;

        return {
            init: function () {
                this.appendValueInput(SerialPrintFormatBlock.INPUT)
                    .appendField('print')
                this.appendDummyInput('')
                    .appendField('to serial output with arguments:');

                for (let i = 0; i < argNum; i++) {
                    this.appendValueInput(SerialPrintFormatBlock.ARGUMENT + i);
                }
                
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [SerialPrintFormatBlock.INPUT]: {
                    "block": {
                        "type": TextBlock.IDENTIFIER,
                        "fields": {
                            [TextBlock.INPUT]: "Hello World!"
                        }
                    }
                }
            }
        })
    }

    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = generator.valueToCode(block, SerialPrintFormatBlock.INPUT, Order.NONE);

        let base = 'Serial.print(' + input + ', ';
        for (let i = 0; i < this.argNum; i++) {
            const arg = generator.valueToCode(block, SerialPrintFormatBlock.ARGUMENT + i, Order.NONE);
            if (i === this.argNum - 1) {
                base = base + arg + ');';
                continue;
            }

            base = base + arg + ', ';
        }

        return base;
    }
}