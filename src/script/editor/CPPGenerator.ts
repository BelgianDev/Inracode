import {type Block, CodeGenerator} from "blockly";

export const cppGenerator = new CodeGenerator('CPP');
cppGenerator.scrub_ = scrub;

function scrub(block: Block, code: string, thisOnly: boolean): string {
    const nextBlock = block.nextConnection && block.nextConnection.targetBlock();

    if (nextBlock && !thisOnly) {
        return code + '\n' + cppGenerator.blockToCode(nextBlock);
    }

    return code;
}