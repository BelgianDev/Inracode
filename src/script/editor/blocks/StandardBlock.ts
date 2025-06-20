import {CodeBlock} from "../CodeBlock.ts";
import * as Blockly from "blockly";
import type {BlockDefinition} from "blockly/core/blocks";

export abstract class StandardBlock extends CodeBlock {
    protected definition(): BlockDefinition {
        return Blockly.Blocks[this.identifier()];
    }
}