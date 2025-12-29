import {CodeBlock} from "../../CodeBlock.ts";
import * as Blockly from "blockly";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";

/**
 * Represents a special block used by mutators, and not as actual blocks, those should not be registered to the toolbox.
 */
export abstract class MutatorBlock extends CodeBlock {
    public register(): BlockDefinition {
        const identifier = this.identifier();
        const category = this.category();
        const def = this.definition();

        const defInit = def.init;
        def.init = function (this: Blockly.Block) {
            defInit.call(this);
            this.setStyle(category.categorystyle)
        };

        // Prevent the block from being registered twice to the toolbox when vite is reloading
        if (Blockly.Blocks[identifier] != null)
            return;

        Blockly.Blocks[identifier] = def;
    }

    //@ts-ignore
    public generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        return ""; // Mutators do not generate code
    }
}