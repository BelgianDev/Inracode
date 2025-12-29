import 'blockly/blocks'
import * as Blockly from "blockly";
// @ts-ignore
import type {CategoryInfo} from "blockly/core/utils/toolbox";
// @ts-ignore
import type {BlockDefinition} from "blockly/core/blocks";
import {cppGenerator} from "./CPPGenerator.ts";
import {StandardBlock} from "./blocks/StandardBlock.ts";

/**
 * Basic representation of a block.
 */
export abstract class CodeBlock {

    /**
     * Identifier of the block.
     */
    public abstract identifier(): string;

    /**
     * Defies the category in which the block should go.
     */
    protected abstract category(): CategoryInfo;

    /**
     * Retrieve the block definition.
     */
    protected abstract definition(): BlockDefinition;

    /**
     * Called when generating code.
     */
    protected abstract generateCode(block: Blockly.Block, generator: Blockly.Generator): string | [string, number];

    /**
     * Fill the category with the block definition and presets.
     */
    protected fillCategory(category: CategoryInfo): void {
        category.contents.push({
            kind: 'block',
            type: this.identifier(),
        });
    }

    public register() {
        const identifier = this.identifier();
        const category = this.category();
        const def = this.definition();

        const defInit = def.init;
        def.init = function (this: Blockly.Block) {
            defInit.call(this);
            this.setStyle(category.categorystyle)
        };

        cppGenerator.forBlock[identifier] = (block, generator) => this.generateCode(block, generator);
        // Prevent the block from being registered twice to the toolbox when vite is reloading - this will also prevent blocks reregistering standard blockly blocks.
        if (Blockly.Blocks[identifier] != null && !(this instanceof StandardBlock))
            return;

        Blockly.Blocks[identifier] = def;

        if (!category.contents)
            category.contents = [];

        this.fillCategory(category);
    }
}