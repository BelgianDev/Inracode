<script setup lang="ts">
import { NSplit } from 'naive-ui';
import BlockEditor from "./editor/BlockEditor.vue";
import CodeViewer from "./editor/CodeViewer.vue";
import {useEditorStore} from "../script/editor/EditorStore.ts";

const editorStore = useEditorStore();

</script>

<template>
  <n-split direction="horizontal" id="editor-split" v-model:size="editorStore.dividerPos" :min="0.5" :max="0.8">
    <template #1>
      <BlockEditor/>
    </template>
    <template #2>
      <CodeViewer/>
    </template>
  </n-split>
</template>

<style scoped>
#editor-split {
  height: calc(100vh - 64px);
}
</style>
