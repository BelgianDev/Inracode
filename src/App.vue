<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { NConfigProvider, NDialogProvider, NModalProvider } from 'naive-ui';
import Editor from "./components/Editor.vue";

import hljs from "highlight.js";
import cpp from "highlight.js/lib/languages/c";
import Phone from "./components/pages/Phone.vue";


const MIN_SUPPORTED_WIDTH = 768 // Minimum allowed resolution width for the editor to work properly.
const validResolution = ref<boolean>(true)

function handleResize() {
  const size = typeof window !== 'undefined' ? window.innerWidth : MIN_SUPPORTED_WIDTH
  validResolution.value = size >= MIN_SUPPORTED_WIDTH
}

onMounted(() => {
  handleResize()
  window.addEventListener('resize', handleResize, { passive: true })
})

// Code Highlight
hljs.registerLanguage('cpp', cpp);
</script>

<template>
  <n-config-provider :hljs="hljs">
    <n-modal-provider>
      <n-dialog-provider>
        <Phone v-if="!validResolution"/>
        <Editor v-else/>
      </n-dialog-provider>
    </n-modal-provider>
  </n-config-provider>
</template>

<style>

</style>
