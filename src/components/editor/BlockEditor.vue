<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import * as Blockly from 'blockly/core'
import * as en from 'blockly/msg/en'
import 'blockly/blocks'
import {useEditorStore} from "../../script/editor/EditorStore.ts";
import {Categories} from "../../script/editor/Categories.ts";
import type {ToolboxDefinition} from "blockly/core/utils/toolbox";
import {registerBlocks} from "../../script/editor/BlockRegistry.ts";
import type {Abstract} from "blockly/core/events/events_abstract";
import {cppGenerator} from "../../script/editor/CPPGenerator.ts";

const editorStore = useEditorStore();

const blockEditor = ref<HTMLElement>();
const workspace = ref<Blockly.WorkspaceSvg | null>();

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

async function generateCode(event: Abstract) {
  if (!workspace.value || !eventForCodeRegen.has(event.type))
    return;

  if (workspace.value.isDragging())
    return;

  console.log("Generating code...");
  editorStore.code = cppGenerator.workspaceToCode(workspace.value);
}

watch(() => editorStore.dividerPos, () => {
  if (!workspace.value)
    return;

  Blockly.svgResize(workspace.value);
});

onMounted(() => {
  if (!blockEditor.value)
    return;

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
    toolbox: initializeToolbox()
  }

  workspace.value = Blockly.inject(blockEditor.value, editorOptions);
  workspace.value.addChangeListener(generateCode);
  workspace.value.addChangeListener(Blockly.Events.disableOrphans);
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


