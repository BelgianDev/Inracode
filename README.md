# Inracode

**Inracode** is a block-based code editor designed to introduce students to coding. It provides a free, lightweight environment that bridges the gap between visual blocks and real programming code. The goal is to present the code created in blocks as close to actual code as possible, while abstracting away strict syntax requirements imposed by low-level programming languages.

Under the hood, Inracode uses [Blockly](https://developers.google.com/blockly) to create a simple block editor. It translates blocks into code in real time, allowing students to focus on learning coding concepts without being hindered by syntax issues.

## Why Use Inracode?

Programming can be a strict and often intimidating system, but it powers nearly everything in our modern world. While programming is powerful, it’s also challenging to grasp, especially for beginners. Fundamental concepts like scope, data types, variables, and many more can be overwhelming, especially when coupled with strict syntax rules.

Inracode aims to address this challenge by offering:

- A block-based interface to help students focus entirely on understanding coding concepts.
- Real-time, side-by-side code generation from blocks, allowing students to associate the logic of blocks with actual code.
- The ability to copy the generated code and paste it into their favorite editor to run and experiment with.

With Inracode, students can take their time to *grasp core programming concepts* before transitioning to traditional text-based languages.

## Supported Platforms & Languages

Inracode currently focuses on **C** and **C++**, as these foundational languages are widely used in embedded systems and many other applications.

### Officially Supported Platform

- [**M5Stack Core Basic**](https://shop.m5stack.com/products/esp32-basic-core-lot-development-kit-v2-7): Inracode is tailored to support this platform.

While not officially supported, the M5Stack firmware and API are largely based on the [Arduino](https://www.arduino.cc/) ecosystem. As a result, Inracode can also generate code compatible with some Arduino devices, though compatibility is not guaranteed.

### Future Language Support

Support for additional languages may be considered in future updates, but this is not currently planned.

## Development
Inracode uses [Vite](https://vite.dev/) as its build tool.

**Requirements**
- NodeJS 18
- Git

```shell
# Clone and enter the repository.
git clone https://github.com/BelgianDev/Inracode
cd Inracode

npm install # Install dependencies
npm run dev # Start the vite test-server
```

## Contributions
Contributions are always appreciated!

Any efforts to add support for new platforms or languages will need to be postponed as the current version of the editor does not include a system for handling multiple languages or platforms.

### Add a block
The Editor works with an object-oriented philosophy.

Lets run through how to create a custom block.

#### Block class
Block classes should always be inside of a respective ``src/script/editor/blocks`` directory.

````typescript
const INPUT = "INPUT"; // Use a constant for input keys, makes it easier to track them.

export class CustomPrintBlock extends CodeBlock { // Extend the base CodeBlock class which handles most of the block's logic and registration.
    protected identifier(): string { 
        return "custom-print-block"; // Represents the unique identifier of the block.
    }

    protected category(): CategoryInfo { // Category of the block, used to represents where in the toolbox the block is located.
        return Categories.CUSTOM;
    }

    protected definition(): BlockDefinition { // Blockly Block definition, see https://developers.google.com/blockly/guides/create-custom-blocks/define/block-definitions
        return {
            init: function () { // Use https://google.github.io/blockly-samples/examples/developer-tools/index.html to create block definitions
                this.appendValueInput(INPUT)
                    .appendField('print')
                this.appendDummyInput('')
                    .appendField('to my super stdout!');
                this.setInputsInline(true)
                this.setPreviousStatement(true, null);
                this.setNextStatement(true, null);
                this.setTooltip('');
                this.setHelpUrl('');
                // Colors are inherited from the category of the block, as such no need to specifiy it.
            }
        }
    }

    // Code generation, see https://developers.google.com/blockly/guides/create-custom-blocks/code-generation/overview
    protected generateCode(block: Blockly.Block, generator: Blockly.CodeGenerator): string | [string, number] {
        const input = generator.valueToCode(block, INPUT, Order.NONE);

        return 'custom.print(' +  input + ');';
    }
}
````

Adding Blockly blocks can be done by extending the ``StandardBlock.ts`` class which handles blockly related definitions automatically, 
you still need to implement the generation logic.

#### Registering the Block
To see our block, we need to register it inside the ``BlockRegistry.ts`` which will register our blocks to blockly.

Inside it, we can see an array of blocks that are already present, simply append your new block constructor inside.
```typescript
const REGISTERED_BLOCKS: CodeBlock[] = [
    // ...
    new CustomPrintBlock()
    // ...
];
```

### Categories
Categories are an important part of any editor, it represents where a block should be located.

Inside the ``Categories.ts`` file you will find an `Categories` class that exports itself, inside it static categories are available.
To add your own Category, you can simply append your category to the list of static fields.

```typescript
export class Categories {
    // ...
    static readonly CUSTOM = registerCategory('Custom', 60); // Identifier and color.
    // ...
    
    static asToolboxContent(): ToolboxItemInfo[] {
        const content: ToolboxItemInfo[] = [
            // ...
            Categories.CUSTOM, // add your own category to the content, this will also specify the order and the placement of the category in the workspace.
            //...
        ];

        return content;
    }
}
```
