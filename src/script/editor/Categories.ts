// @ts-ignore
import type {CategoryInfo, ToolboxItemInfo} from "blockly/core/utils/toolbox";
// @ts-ignore
import type {CssConfig as CategoryCssConfig} from "blockly/core/toolbox/category";

const toolbox: ToolboxItemInfo[] = [];

function createRootCategory(identifier: string, name: string, appendSpace: boolean = false): Category {
    const category: Category = new Category(identifier, name);

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
    contents: ToolboxItemInfo[];
    categorystyle: string;
    identifier: string;

    constructor(identifier: string, name: string) {
        this.kind = 'category';
        this.name = name;
        this.identifier = identifier;
        this.categorystyle = identifier;
        this.contents = [];
    }

    public createSubCategory(identifier: string, name: string): Category {
        const subCategory = new Category(this.identifier + "_" + identifier, name);
        this.contents.push(subCategory);
        return subCategory;
    }
}

export class Categories {
    static readonly CORE = createRootCategory('core', 'Core');
    static readonly LOGIC = createRootCategory('logic', 'Logic');
    static readonly MATH = createRootCategory('math', 'Math');
    static readonly VARIABLE = createRootCategory('variable', 'Variable', true);

    // Module Specific
    static readonly M5STACK = createRootCategory('stack', 'M5Stack');
    static readonly M5STACK_BTN = Categories.M5STACK.createSubCategory('button', 'Button');
    static readonly M5STACK_SERIAL = Categories.M5STACK.createSubCategory('serial', 'Serial');
    static readonly M5STACK_SPEAKER = Categories.M5STACK.createSubCategory('speaker', 'Speaker');
    static readonly M5STACK_LCD = Categories.M5STACK.createSubCategory('lcd', 'LCD');
    static readonly M5STACK_LCD_TEXT = Categories.M5STACK_LCD.createSubCategory('text', 'Text');
    static readonly M5STACK_LCD_GRAPHICS = Categories.M5STACK_LCD.createSubCategory('graphics', 'Graphics');
    static readonly M5STACK_GPIO = Categories.M5STACK.createSubCategory('gpio', 'GPIO');

    static asToolboxContent(): ToolboxItemInfo[] {
        return toolbox;
    }
}
