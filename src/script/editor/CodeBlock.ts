import 'blockly/blocks'
import * as Blockly from "blockly";
import type {CategoryInfo} from "blockly/core/utils/toolbox";
import type {BlockDefinition} from "blockly/core/blocks";
import {cppGenerator} from "./CPPGenerator.ts";

/**
 * Basic representation of a block.
 */
export abstract class CodeBlock {

    /**
     * Identifier of the block.
     */
    protected abstract identifier(): string;

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

    public register() {
        const identifier = this.identifier();
        const category = this.category();
        const def = this.definition();

        const defInit = def.init;
        def.init = function (this: Blockly.Block) {
            defInit.call(this);
            this.setColour(category.colour); // Inject the category color
        };

        Blockly.Blocks[identifier] = def;
        cppGenerator.forBlock[identifier] = (block, generator) => this.generateCode(block, generator);

        if (!category.contents)
            category.contents = [];

        category.contents.push({
            kind: 'block',
            type: identifier,
        });
    }
}