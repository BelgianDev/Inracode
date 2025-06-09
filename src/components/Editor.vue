<script setup lang="ts">
import { ref, onMounted} from 'vue'
import * as Blockly from 'blockly/core'
import * as en from 'blockly/msg/en'
import 'blockly/blocks'

const blockEditor = ref<Element>();

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
    toolbox: {
      kind: "categoryToolbox",
      contents: [
        {
          kind: "category",
          name: "Control",
          colour: "#888",
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

  Blockly.inject(blockEditor.value, editorOptions);
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


