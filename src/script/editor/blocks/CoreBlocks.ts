import * as Blockly from 'blockly/core';
import {BlockRegister, registerBlock} from "./BlockRegistry";
import {Categories} from "../Categories.ts";

export class CoreBlocks extends BlockRegister {
    static INSTANCE = new CoreBlocks(Categories.CORE);

    protected registerBlocks(): void {
        registerBlock('core-setup', this.category, {
            init: function() {
                this.appendDummyInput().appendField('Setup');
                this.appendStatementInput('setup')
                this.appendEndRowInput();
            }
        })

        registerBlock('core-loop', this.category, {
            init: function() {
                this.appendDummyInput().appendField('Loop');
                this.appendStatementInput('setup')
                this.appendEndRowInput();
            }
        })

        registerBlock('core-define', this.category, {
            init: function() {
                this.appendDummyInput().appendField('Define')
                    .appendField(new Blockly.FieldTextInput(''), 'VAR_NAME')
                    .appendField('of type')
                    .appendField(new Blockly.FieldDropdown([
                        ['int', 'INT'],
                        ['bool', 'BOOLEAN'],
                        ['string', 'STRING'],
                    ]))
                    .appendField("as")
                    .appendField(new Blockly.FieldTextInput(''), 'VAR_VALUE');
            }
        })

        registerBlock('core-define-var', this.category, {
            init: function() {
                this.setPreviousStatement(true);
                this.setNextStatement(true);
                this.appendDummyInput('DEF_VAR')
                    .appendField('Create variable')
                    .appendField(new Blockly.FieldTextInput(''), 'VAR_NAME')
                    .appendField('of type')
                    .appendField(new Blockly.FieldDropdown([
                        ['int', 'INT'],
                        ['bool', 'BOOLEAN'],
                        ['string', 'STRING'],
                    ]))
                    .appendField("as")
                    .appendField(new Blockly.FieldTextInput(''), 'VAR_VALUE');
            }
        })
    }
}
