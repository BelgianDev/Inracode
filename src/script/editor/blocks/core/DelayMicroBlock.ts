import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import {Categories} from "../../Categories.ts";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {Order} from "blockly/javascript";
import {NumberBlock} from "../variable/NumberBlock.ts";

export class DelayMicroBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "core-delay-micro";
    public static readonly DELAY: string = "DELAY";

    public identifier(): string {
        return DelayMicroBlock.IDENTIFIER;
    }

    protected category(): CategoryInfo {
        return Categories.CORE;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendValueInput(DelayMicroBlock.DELAY)
                    .appendField('Wait')
                this.appendDummyInput()
                    .appendField('microseconds')
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                this.setColour(225);
            }
        }
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const delay = generator.valueToCode(block, DelayMicroBlock.DELAY, Order.NONE);
        return "delayMicroseconds(" + delay + ");";
    }

    protected fillCategory(category: CategoryInfo) {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
            inputs: {
                [DelayMicroBlock.DELAY]: {
                    "block": {
                        "type": NumberBlock.IDENTIFIER,
                        "fields": {
                            [NumberBlock.NUM]: 1000
                        }
                    }
                }
            }
        })
    }
}