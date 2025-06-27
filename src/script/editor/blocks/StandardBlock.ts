import {CodeBlock} from "../CodeBlock.ts";
import * as Blockly from "blockly";
import type {BlockDefinition} from "blockly/core/blocks";

/**
 * Represents a block already added by blockly and thus does not need a block definition to be set for it.
 */
export abstract class StandardBlock extends CodeBlock {
    protected definition(): BlockDefinition {
        return Blockly.Blocks[this.identifier()];
    }
}