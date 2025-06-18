<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import * as Blockly from 'blockly/core'
import * as en from 'blockly/msg/en'
import 'blockly/blocks'
import {useEditorPreferences} from "../../script/EditorPreferences.ts";
import {CoreBlocks} from "../../script/editor/blocks/CoreBlocks.ts";
import {Categories} from "../../script/editor/Categories.ts";
import type {ToolboxDefinition} from "blockly/core/utils/toolbox";
import {M5StackBlocks} from "../../script/editor/blocks/M5StackBlocks.ts";

const editorPrefs = useEditorPreferences();

const blockEditor = ref<HTMLElement>();
const workspace = ref<Blockly.WorkspaceSvg | null>();

function initializeToolbox(): ToolboxDefinition {
  const categories = Categories.asToolboxContent();
  initializeBlocks();

  return {
    kind: "categoryToolbox",
    contents: categories
  }
}

function initializeBlocks() {
  CoreBlocks.INSTANCE.register();
  M5StackBlocks.INSTANCE.register();
}

watch(() => editorPrefs.dividerPos, () => {
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
      spacing: 50,
      length: 2,
      colour: '#bbb',
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


