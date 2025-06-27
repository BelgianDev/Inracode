import 'blockly/blocks'
import * as Blockly from "blockly";
import type {CategoryInfo, ToolboxItemInfo} from "blockly/core/utils/toolbox";
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

        const alreadyRegistered = Blockly.Blocks[identifier] !== undefined;

        const defInit = def.init;
        def.init = function (this: Blockly.Block) {
            defInit.call(this);
            this.setColour(category.colour); // Inject the category color
        };

        Blockly.Blocks[identifier] = def;
        cppGenerator.forBlock[identifier] = (block, generator) => this.generateCode(block, generator);

        const isInCategory = category.contents?.some(
            (item: ToolboxItemInfo) => item.kind === 'block' && item.type === identifier
        );

        if (isInCategory) { // Prevent the block from being registered twice to the toolbox when vite is reloading
            console.warn(`Block with identifier ${identifier} is already in the category.`);
            return;
        }

        if (!category.contents)
            category.contents = [];

        category.contents.push({
            kind: 'block',
            type: identifier,
        });
    }
}