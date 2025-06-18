<script setup lang="ts">
import {ref, onMounted, computed, watch} from 'vue'
import * as Blockly from 'blockly/core'
import * as en from 'blockly/msg/en'
import 'blockly/blocks'
import {useEditorPreferences} from "../../script/EditorPreferences.ts";

const editorPrefs = useEditorPreferences();

const blockEditor = ref<HTMLElement>();
const workspace = ref<Blockly.WorkspaceSvg | null>();

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
      spacing: 25,
      length: 1,
      colour: '#ccc',
      snap: true,
    },
    move: {
      drag: true,
      scrollbars: true,
    },
    trashcan: false,
    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Control",
          contents: [
            {
              kind: "block",
              type: "controls_if"
            },
          ]
        },
        {
          kind: "category",
          name: "Logic",
          categorystyle: "logic_category",
          contents: [
            {
              kind: "block",
              type: "logic_compare"
            },
            {
              kind: "block",
              type: "logic_operation"
            },
            {
              kind: "block",
              type: "logic_boolean"
            }
          ]
        }
      ]
    }
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


