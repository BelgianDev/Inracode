<script setup lang="ts">
import {ref, onMounted, watch} from 'vue'
import * as Blockly from 'blockly/core'
import * as en from 'blockly/msg/en';
import 'blockly/blocks'
import {useEditorStore} from "../../script/editor/EditorStore.ts";
import {Categories} from "../../script/editor/Categories.ts";
//@ts-ignore
import type {ToolboxDefinition} from "blockly/core/utils/toolbox";
import {registerBlocks} from "../../script/editor/BlockRegistry.ts";
//@ts-ignore
import type {Abstract} from "blockly/core/events/events_abstract";
import {cppGenerator} from "../../script/editor/CPPGenerator.ts";

import { theme } from "../../blockly/theme.ts"

const editorStore = useEditorStore();
const blockEditor = ref<HTMLElement>();

function initializeToolbox(): ToolboxDefinition {
  const categories = Categories.asToolboxContent();
  registerBlocks();

  return {
    kind: "categoryToolbox",
    contents: categories
  }
}

const eventForCodeRegen = new Set([
  Blockly.Events.BLOCK_CHANGE,
  Blockly.Events.BLOCK_CREATE,
  Blockly.Events.BLOCK_DELETE,
  Blockly.Events.BLOCK_MOVE,
]);

// LET TYPESCRIPT SCREAM, WANT TO HEAR IT CRY
async function generateCode(event?: Abstract) {
  if (!editorStore.workspace || !eventForCodeRegen.has(event.type))
    return;

  //@ts-ignore
  if (editorStore.workspace.isDragging())
    return;

  console.log("Generating code...");
  //@ts-ignore
  editorStore.code = cppGenerator.workspaceToCode(editorStore.workspace);
  await editorStore.saveWorkspace();
}

watch(() => editorStore.dividerPos, () => {
  if (!editorStore.workspace)
    return;

  // @ts-ignore
  Blockly.svgResize(editorStore.workspace);
});

onMounted(() => {
  if (!blockEditor.value)
    return;

  //@ts-ignore
  Blockly.setLocale(en);

  const editorOptions: Blockly.BlocklyOptions = {
    grid: {
      spacing: 25,
      length: 2,
      colour: '#fff',
      snap: true,
    },
    move: {
      drag: true,
      scrollbars: true,
    },
    trashcan: true,
    toolbox: initializeToolbox(),
    theme: theme
  }

  editorStore.workspace = Blockly.inject(blockEditor.value, editorOptions);
  editorStore.workspace.addChangeListener(generateCode);
  editorStore.workspace.addChangeListener(Blockly.Events.disableOrphans);

  editorStore.loadSavedWorkspace();
})

</script>

<template>
  <div id="block-editor" ref="blockEditor"/>
</template>

<style>
#block-editor {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
</style>


