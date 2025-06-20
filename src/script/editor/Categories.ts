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
    static readonly CORE = registerCategory('Core', 60);
    static readonly LOGIC = registerCategory('Logic', 120);
    static readonly MATH = registerCategory('Math', 180);
    static readonly VARIABLE = registerCategory('Variable', 230);

    // Module Specific
    static readonly M5STACK = registerCategory('M5Stack', 360);

    static asToolboxContent(): ToolboxItemInfo[] {
        const content: ToolboxItemInfo[] = [
            Categories.CORE,
            Categories.LOGIC,
            Categories.MATH,
            Categories.VARIABLE,
            createSpacing(),
            Categories.M5STACK,
        ];

        return content;
    }
}
