import {CodeBlock} from "../../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {TextBlock} from "../../variable/TextBlock.ts";

export class LcdPrintFormatBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "m5-lcd-print-format-";
    public static readonly INPUT: string = "INPUT"
    public static readonly ARGUMENT: string = "ARG";

    private readonly argNum: number;

    public constructor(argNum: number) {
        super()
        this.argNum = argNum;
    }

    public identifier(): string {
        return LcdPrintFormatBlock.IDENTIFIER + this.argNum;
    }

    protected category(): CategoryInfo {
        return Categories.M5STACK_LCD_TEXT;
    }

    protected definition(): BlockDefinition {
        const argNum = this.argNum;

        return {
            init: function () {
                this.appendValueInput(LcdPrintFormatBlock.INPUT)
                    .appendField('print')
                this.appendDummyInput('')
                    .appendField('to LCD screen with arguments:');

                for (let i = 0; i < argNum; i++) {
                    this.appendValueInput(LcdPrintFormatBlock.ARGUMENT + i);
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
                [LcdPrintFormatBlock.INPUT]: {
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
        const input = generator.valueToCode(block, LcdPrintFormatBlock.INPUT, Order.NONE);

        let base = 'M5.Lcd.printf(' + input + ', ';
        for (let i = 0; i < this.argNum; i++) {
            const arg = generator.valueToCode(block, LcdPrintFormatBlock.ARGUMENT + i, Order.NONE);
            if (i === this.argNum - 1) {
                base = base + arg + ');';
                continue;
            }

            base = base + arg + ', ';
        }

        return base;
    }
}