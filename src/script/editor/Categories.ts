// @ts-ignore
import type {CategoryInfo, ToolboxItemInfo} from "blockly/core/utils/toolbox";
// @ts-ignore
import type {CssConfig as CategoryCssConfig} from "blockly/core/toolbox/category";

const toolbox: ToolboxItemInfo[] = [];

function createRootCategory(name: string, color: number, appendSpace: boolean = false): Category {
    const category: Category = new Category(name, color);

    toolbox.push(category);
    if (appendSpace)
        toolbox.push(createSpacing());

    return category;
}

function createSpacing(): ToolboxItemInfo {
    return { kind: 'sep' };
}

class Category implements CategoryInfo {
    kind: 'category';
    name: string;
    colour: number;
    contents: ToolboxItemInfo[];
    id: string | undefined;
    categorystyle: string | undefined;
    cssconfig: CategoryCssConfig | undefined;
    hidden: string | undefined;
    expanded?: string | boolean;

    constructor(name: string, colour: number) {
        this.kind = 'category';
        this.name = name;
        this.colour = colour;
        this.contents = [];

        // Blockly managed properties
        this.id = undefined;
        this.categorystyle = undefined;
        this.cssconfig = undefined;
        this.hidden = undefined;
        this.expanded = undefined;
    }

    public createSubCategory(name: string, color: number): Category {
        const subCategory = new Category(name, color);
        this.contents.push(subCategory);
        return subCategory;
    }
}

export class Categories {
    static readonly CORE = createRootCategory('Core', 60);
    static readonly LOGIC = createRootCategory('Logic', 120);
    static readonly MATH = createRootCategory('Math', 180);
    static readonly VARIABLE = createRootCategory('Variable', 230, true);

    // Module Specific
    static readonly M5STACK = createRootCategory('M5Stack', 360);
    static readonly M5STACK_SERIAL = Categories.M5STACK.createSubCategory("Serial", 160);
    static readonly M5STACK_LCD = Categories.M5STACK.createSubCategory('LCD', 240);
    static readonly M5STACK_GPIO = Categories.M5STACK.createSubCategory('GPIO', 120);

    static asToolboxContent(): ToolboxItemInfo[] {
        return toolbox;
    }
}
