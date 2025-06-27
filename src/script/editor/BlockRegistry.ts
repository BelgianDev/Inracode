import type {CodeBlock} from "./CodeBlock.ts";

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
import {NumberBlock} from "./blocks/variable/NumberBlock.ts"
import {GetVariableBlock} from "./blocks/variable/GetVariableBlock.ts";
import {SetVariableBlock} from "./blocks/variable/SetVariableBlock.ts";
import {OperationBlock} from "./blocks/logic/OperationBlock.ts";
import {BooleanBlock} from "./blocks/variable/BooleanBlock.ts";
import {NegateBlock} from "./blocks/logic/NegateBlock.ts";
import {NullBlock} from "./blocks/variable/NullBlock.ts";
import {TextBlock} from "./blocks/variable/TextBlock.ts";

const REGISTERED_BLOCKS: CodeBlock[] = [
    // Core
    new IncludeBlock(),
    new DefineBlock(),
    new SetupBlock(),
    new LoopBlock(),
    new GlobalBlock(),

    // Logic
    new NegateBlock(),
    new CompareBlock(),
    new OperationBlock(),
    new IfBlock(),

    // Variable
    new NullBlock(),
    new NumberBlock(),
    new BooleanBlock(),
    new TextBlock(),
    new GetVariableBlock(),
    new DefineVariableBlock(),
    new SetVariableBlock(),

    // M5
    new BeginBlock(),
    new LcdCursorBlock(),
    new LcdTextSizeBlock(),
    new LcdPrintBlock(),
];

export function registerBlocks() {
    REGISTERED_BLOCKS.forEach(block => block.register());
}

