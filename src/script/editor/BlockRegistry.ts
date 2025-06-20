import type {CodeBlock} from "./CodeBlock.ts";

import * as Blockly from 'blockly';

import {CompareBlock} from "./blocks/logic/CompareBlock.ts";
import {IfBlock} from "./blocks/logic/IfBlock.ts";
import {DefineVariableBlock} from "./blocks/variable/DefineVariableBlock.ts";
import {IncludeBlock} from "./blocks/core/IncludeBlock.ts";
import {SetupBlock} from "./blocks/core/SetupBlock.ts";
import {LoopBlock} from "./blocks/core/LoopBlock.ts";
import {GlobalBlock} from "./blocks/core/GlobalBlock.ts";
import {BeginBlock} from "./blocks/m5/BeginBlock.ts";
import {LcdCursorBlock} from "./blocks/m5/LcdCursorBlock.ts";
import {LcdTextSizeBlock} from "./blocks/m5/LcdTextSizeBlock.ts";
import {LcdPrintBlock} from "./blocks/m5/LcdPrintBlock.ts";
import {DefineBlock} from "./blocks/core/DefineBlock.ts";
import {NumberBlock} from "./blocks/math/CompareBlock.ts";

const REGISTERED_BLOCKS: CodeBlock[] = [
    // Core
    new IncludeBlock(),
    new DefineBlock(),
    new SetupBlock(),
    new LoopBlock(),
    new GlobalBlock(),

    // Logic
    new CompareBlock(),
    new IfBlock(),

    // Math
    new NumberBlock(),

    // Variable
    new DefineVariableBlock(),

    // M5
    new BeginBlock(),
    new LcdCursorBlock(),
    new LcdTextSizeBlock(),
    new LcdPrintBlock(),
];

export function registerBlocks() {
    REGISTERED_BLOCKS.forEach(block => block.register());
}

