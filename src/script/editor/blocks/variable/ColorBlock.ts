// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import * as Blockly from 'blockly';
import {Categories} from "../../Categories.ts";
import {Order} from "blockly/javascript";
import {CodeBlock} from "../../CodeBlock.ts";
import * as Colors from "../../DefinedColors.ts"
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

export class ColorBlock extends CodeBlock {
    public static readonly IDENTIFIER: string = "variable-color";
    public static readonly COLOR: string = "HEX";

    public identifier(): string {
        return ColorBlock.IDENTIFIER;
    }

    protected definition(): BlockDefinition {
        return {
            init: function () {
                this.appendDummyInput('')
                    .appendField('color')
                    .appendField(Colors.createColorField(), ColorBlock.COLOR);
                this.setOutput(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
            }
        }
    }

    protected category(): CategoryInfo {
        return Categories.VARIABLE;
    }

    // @ts-ignore
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const color = block.getFieldValue(ColorBlock.COLOR);
        return [color, Order.NONE];
    }

}