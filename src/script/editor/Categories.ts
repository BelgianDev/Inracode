import type {CategoryInfo, ToolboxItemInfo} from "blockly/core/utils/toolbox";

function registerCategory(name: string, color: number): CategoryInfo {
    return {
        kind: 'category',
        name: name,
        colour: color
    }
}

function createSpacing(): ToolboxItemInfo {
    return { kind: 'sep' };
}

export class Categories {
    static readonly CONTROL = registerCategory('Control', 120);
    static readonly LOGIC = registerCategory('Logic', 210);

    static readonly CORE = registerCategory('Core', 60);
    static readonly M5STACK = registerCategory('M5Stack', 360);

    static asToolboxContent(): ToolboxItemInfo[] {
        const content: ToolboxItemInfo[] = [
            Categories.CONTROL,
            Categories.LOGIC,
            createSpacing(),
            Categories.CORE,
            Categories.M5STACK,
        ];

        return content;
    }
}
