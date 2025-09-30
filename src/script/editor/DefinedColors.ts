import * as Blockly from "blockly";

// Coming from m5stack-core-esp32/M5Stack/src/utility/ILI9341_Defines.h
const colors = ["BLACK", "NAVY", "DARKGREEN", "DARKCYAN", "MAROON", "PURPLE", "OLIVE", "LIGHTGREY", "DARKGREY",
    "BLUE", "GREEN", "CYAN", "RED", "MAGENTA", "YELLOW", "WHITE", "ORANGE", "GREENYELLOW", "PINK"];

export function createColorField() {
    const elements: any = [];
    for (const color of colors) {
        elements.push([color, color]);
    }

    return new Blockly.FieldDropdown(elements)
}

