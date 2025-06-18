import * as Blockly from 'blockly/core';
import {BlockRegister, registerBlock} from "./BlockRegistry";
import {Categories} from "../Categories.ts";

export class M5StackBlocks extends BlockRegister {
    static INSTANCE = new M5StackBlocks(Categories.M5STACK);

    protected registerBlocks(): void {
        registerBlock('m5-lcd-cursor', this.category, {
            init: function() {
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.appendDummyInput('CURSOR')
                    .appendField('Set lcd cursor to X:')
                    .appendField(new Blockly.FieldNumber(0), 'CURSOR_X')
                    .appendField('Y:')
                    .appendField(new Blockly.FieldNumber(0), 'CURSOR_Y');
            }
        })
    }
}
