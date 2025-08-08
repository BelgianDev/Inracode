<script setup lang="ts">
import { NCode } from 'naive-ui';
import { useEditorStore } from "../../script/editor/EditorStore.ts";

const editorStore = useEditorStore();

</script>

<template>
  <div style="margin: 15px">
    <n-code show-line-numbers language="cpp" :code="editorStore.code"/>
  </div>
</template>

<style>

</style>