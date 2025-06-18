<script setup lang="ts">
import { NConfigProvider } from 'naive-ui';
import Editor from "./components/Editor.vue";
import TopBar from "./components/TopBar.vue";

import hljs from "highlight.js";
import cpp from "highlight.js/lib/languages/c";

// Code Highlight
hljs.registerLanguage('cpp', cpp);
</script>

<template>
  <n-config-provider :hljs="hljs">
    <TopBar/>
    <Editor/>
  </n-config-provider>
</template>

<style>

</style>
