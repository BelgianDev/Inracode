import * as Blockly from 'blockly/core'
import type {BlockDefinition} from "blockly/core/blocks";
import type {StaticCategoryInfo} from "blockly/core/utils/toolbox";

export abstract class BlockRegister {
    protected readonly category: StaticCategoryInfo;
    private registered: boolean = false;

    constructor(category: StaticCategoryInfo) {
        this.category = category;
    }

    public register(): void {
        if (this.registered)
            return;

        this.registered = true;
        this.registerBlocks();
    }

    protected abstract registerBlocks(): void;
}

export function registerBlock(identifier: string, category: StaticCategoryInfo, block: BlockDefinition): string {
    const userInit = block.init;

    block.init = function (this: Blockly.Block) {
        userInit.call(this);
        this.setColour(category.colour); // Inject the category color
    };

    Blockly.Blocks[identifier] = block;

    if (!category.contents)
        category.contents = [];

    category.contents.push({
        kind: 'block',
        type: identifier,
    })

    return identifier;
}
