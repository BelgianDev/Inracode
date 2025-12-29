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
import {SpeakerMuteBlock} from "./blocks/m5/speaker/SpeakerMuteBlock.ts";
import {SpeakerBeepBlock} from "./blocks/m5/speaker/SpeakerBeepBlock.ts";
import {LcdCursorGetXBlock} from "./blocks/m5/lcd/LcdCursorGetXBlock.ts";
import {LcdCursorGetYBlock} from "./blocks/m5/lcd/LcdCursorGetYBlock.ts";
import {LcdClearDisplay} from "./blocks/m5/lcd/LcdClearDisplay.ts";
import {HexBlock} from "./blocks/variable/HexBlock.ts";
import {ColorBlock} from "./blocks/variable/ColorBlock.ts";
import {LcdTextColorBlock} from "./blocks/m5/lcd/LcdTextColorBlock.ts";
import {LcdFillScreenBlock} from "./blocks/m5/lcd/LcdFillScreenBlock.ts";
import {LcdDrawRectBlock} from "./blocks/m5/lcd/LcdDrawRectBlock.ts";
import {LcdFillRectBlock} from "./blocks/m5/lcd/LcdFillRectBlock.ts";
import {LcdDrawCircleBlock} from "./blocks/m5/lcd/LcdDrawCircleBlock.ts";
import {LcdFillCircleBlock} from "./blocks/m5/lcd/LcdFillCircleBlock.ts";
import {LcdFillTriangleBlock} from "./blocks/m5/lcd/LcdFillTriangleBlock.ts";
import {LcdDrawTriangleBlock} from "./blocks/m5/lcd/LcdDrawTriangleBlock.ts";
import {LcdDrawLineBlock} from "./blocks/m5/lcd/LcdDrawLineBlock.ts";
import {UpdateBlock} from "./blocks/m5/UpdateBlock.ts";
import {ButtonWasReleaseForBlock} from "./blocks/m5/button/ButtonWasReleaseForBlock.ts";
import {ButtonIsPressedBlock} from "./blocks/m5/button/ButtonIsPressedBlock.ts";
import {ButtonWasPressedBlock} from "./blocks/m5/button/ButtonWasPressedBlock.ts";
import {ButtonPressedForBlock} from "./blocks/m5/button/ButtonPressedForBlock.ts";
import {ButtonReadBlock} from "./blocks/m5/button/ButtonReadBlock.ts";
import {ButtonLastChangeBlock} from "./blocks/m5/button/ButtonLastChangeBlock.ts";
import {ButtonWasReleasedBlock} from "./blocks/m5/button/ButtonWasReleasedBlock.ts";
import {ButtonReleasedForBlock} from "./blocks/m5/button/ButtonReleasedForBlock.ts";
import {SwitchBlock} from "./blocks/logic/SwitchBlock.ts";

import "../../blockly/Extensions.ts"
import {SwitchCaseBlock} from "./blocks/mutator/switch/SwitchCaseBlock.ts";
import {SwitchHeadBlock} from "./blocks/mutator/switch/SwitchHeadBlock.ts";
import {SwitchDefaultBlock} from "./blocks/mutator/switch/SwitchDefaultBlock.ts";

const REGISTERED_BLOCKS: CodeBlock[] = [
    // Core
    new IncludeBlock(),
    new DefineBlock(),
    new GlobalBlock(),
    new SetupBlock(),
    new LoopBlock(),
    new DelayBlock(),
    new DelayMicroBlock(),

    // Logic
    new NegateBlock(),
    new CompareBlock(),
    new OperationBlock(),
    new IfBlock(),
    new SwitchBlock(),
    new ForILoopBlock(),
    new WhileLoopBlock(),
    new ReturnBlock(),
    new BreakBlock(),
    new ContinueBlock(),

    // Math
    new ArithmeticBlock(),

    // Variable
    new NullBlock(),
    new HexBlock(),
    new NumberBlock(),
    new BooleanBlock(),
    new TextBlock(),
    new ColorBlock(),
    new GetVariableBlock(),
    new DefineVariableBlock(),
    new SetVariableBlock(),

    // M5
    new BeginBlock(),
    new UpdateBlock(),

    // M5 Buttons
    new ButtonReadBlock(),
    new ButtonIsPressedBlock(),
    new ButtonPressedForBlock(),
    new ButtonWasPressedBlock(),
    new ButtonReleasedForBlock(),
    new ButtonWasReleasedBlock(),
    new ButtonWasReleaseForBlock(),
    new ButtonLastChangeBlock(),

    // M5 LCD
    new LcdCursorBlock(),
    new LcdTextSizeBlock(),
    new LcdTextColorBlock(),
    new LcdBrightnessBlock(),
    new LcdPrintBlock(),
    new LcdPrintLineBlock(),
    new LcdClearDisplay(),
    new LcdCursorGetXBlock(),
    new LcdCursorGetYBlock(),
    new LcdFillScreenBlock(),
    new LcdPrintFormatBlock(1),
    new LcdPrintFormatBlock(2),
    new LcdPrintFormatBlock(3),
    new LcdPrintFormatBlock(4),
    new LcdDrawLineBlock(),
    new LcdDrawRectBlock(),
    new LcdFillRectBlock(),
    new LcdDrawCircleBlock(),
    new LcdFillCircleBlock(),
    new LcdDrawTriangleBlock(),
    new LcdFillTriangleBlock(),

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
    new SerialPrintFormatBlock(4),

    // M5 Speaker
    new SpeakerBeepBlock(),
    new SpeakerMuteBlock(),

    // Mutators
    new SwitchHeadBlock(),
    new SwitchCaseBlock(),
    new SwitchDefaultBlock()
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

