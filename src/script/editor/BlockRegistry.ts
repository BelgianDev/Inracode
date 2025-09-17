import type {CodeBlock} from "./CodeBlock.ts";

import {CompareBlock} from "./blocks/logic/CompareBlock.ts";
import {IfBlock} from "./blocks/logic/IfBlock.ts";
import {DefineVariableBlock} from "./blocks/variable/DefineVariableBlock.ts";
import {IncludeBlock} from "./blocks/core/IncludeBlock.ts";
import {SetupBlock} from "./blocks/core/SetupBlock.ts";
import {LoopBlock} from "./blocks/core/LoopBlock.ts";
import {GlobalBlock} from "./blocks/core/GlobalBlock.ts";
import {BeginBlock} from "./blocks/m5/BeginBlock.ts";
import {LcdCursorBlock} from "./blocks/m5/lcd/LcdCursorBlock.ts";
import {LcdTextSizeBlock} from "./blocks/m5/lcd/LcdTextSizeBlock.ts";
import {LcdPrintBlock} from "./blocks/m5/lcd/LcdPrintBlock.ts";
import {DefineBlock} from "./blocks/core/DefineBlock.ts";
import {NumberBlock} from "./blocks/variable/NumberBlock.ts"
import {GetVariableBlock} from "./blocks/variable/GetVariableBlock.ts";
import {SetVariableBlock} from "./blocks/variable/SetVariableBlock.ts";
import {OperationBlock} from "./blocks/logic/OperationBlock.ts";
import {BooleanBlock} from "./blocks/variable/BooleanBlock.ts";
import {NegateBlock} from "./blocks/logic/NegateBlock.ts";
import {NullBlock} from "./blocks/variable/NullBlock.ts";
import {TextBlock} from "./blocks/variable/TextBlock.ts";
import {GpioDigitalReadBlock} from "./blocks/m5/gpio/GpioDigitalReadBlock.ts";
import {GpioDigitalWriteBlock} from "./blocks/m5/gpio/GpioDigitalWriteBlock.ts";
import {SerialPrintBlock} from "./blocks/m5/serial/SerialPrintBlock.ts";
import {SerialPrintFormatBlock} from "./blocks/m5/serial/SerialPrintFormatBlock.ts";
import {LcdPrintFormatBlock} from "./blocks/m5/lcd/LcdPrintFormatBlock.ts";
import {LcdPrintLineBlock} from "./blocks/m5/lcd/LcdPrintLineBlock.ts";
import {SerialPrintLineBlock} from "./blocks/m5/serial/SerialPrintLineBlock.ts";
import {ArithmeticBlock} from "./blocks/math/ArithmeticBlock.ts";
import {GpioModeBlock} from "./blocks/m5/gpio/GpioModeBlock.ts";
import {ForILoopBlock} from "./blocks/logic/ForILoopBlock.ts";
import {BreakBlock} from "./blocks/logic/BreakBlock.ts";
import {ReturnBlock} from "./blocks/logic/ReturnBlock.ts";
import {ContinueBlock} from "./blocks/logic/ContinueBlock.ts";
import {WhileLoopBlock} from "./blocks/logic/WhileLoopBlock.ts";
import {GpioAnalogReadBlock} from "./blocks/m5/gpio/GpioAnalogReadBlock.ts";
import {DelayBlock} from "./blocks/core/DelayBlock.ts";
import {DelayMicroBlock} from "./blocks/core/DelayMicroBlock.ts";
import {LcdBrightnessBlock} from "./blocks/m5/lcd/LcdBrightnessBlock.ts";
import {GpioLedcSetupBlock} from "./blocks/m5/gpio/GpioLedcSetupBlock.ts";
import {GpioLedcAttachPinBlock} from "./blocks/m5/gpio/GpioLedcAttachPinBlock.ts";
import {GpioLedcWriteBlock} from "./blocks/m5/gpio/GpioLedcWriteBlock.ts";
import {GpioLedcDetachPinBlock} from "./blocks/m5/gpio/GpioLedcDetachPinBlock.ts";

const REGISTERED_BLOCKS: CodeBlock[] = [
    // Core
    new IncludeBlock(),
    new DefineBlock(),
    new SetupBlock(),
    new LoopBlock(),
    new GlobalBlock(),
    new DelayBlock(),
    new DelayMicroBlock(),

    // Logic
    new NegateBlock(),
    new CompareBlock(),
    new OperationBlock(),
    new IfBlock(),
    new ForILoopBlock(),
    new WhileLoopBlock(),
    new ReturnBlock(),
    new BreakBlock(),
    new ContinueBlock(),

    // Math
    new ArithmeticBlock(),

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

    // M5 LCD
    new LcdCursorBlock(),
    new LcdTextSizeBlock(),
    new LcdBrightnessBlock(),
    new LcdPrintBlock(),
    new LcdPrintLineBlock(),
    new LcdPrintFormatBlock(1),
    new LcdPrintFormatBlock(2),
    new LcdPrintFormatBlock(3),
    new LcdPrintFormatBlock(4),

    // M5 GPIO
    new GpioModeBlock(),
    new GpioDigitalWriteBlock(),
    new GpioDigitalReadBlock(),
    new GpioAnalogReadBlock(),
    new GpioLedcSetupBlock(),
    new GpioLedcAttachPinBlock(),
    new GpioLedcDetachPinBlock(),
    new GpioLedcWriteBlock(),

    // M5 Serial
    new SerialPrintBlock(),
    new SerialPrintLineBlock(),
    new SerialPrintFormatBlock(1),
    new SerialPrintFormatBlock(2),
    new SerialPrintFormatBlock(3),
    new SerialPrintFormatBlock(4)
];

export function registerBlocks() {
    REGISTERED_BLOCKS.forEach(block => {
        try {
            block.register();
        } catch (e) {
            console.error("Failed to register block '" + block.identifier() + "': ", e);
        }
    });
}

