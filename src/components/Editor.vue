<script setup lang="ts">
import {NFloatButton, NIcon, NSplit, NTooltip} from 'naive-ui';
import BlockEditor from "./editor/BlockEditor.vue";
import CodeViewer from "./editor/CodeViewer.vue";
import {useEditorStore} from "../script/editor/EditorStore.ts";
import {Menu2 as MenuIcon, Files as CopyIcon, CircleCheck as CopiedIcon, FileCode as ExportCodeIcon, FileDownload as DownloadIcon, FileImport as ImportIcon, FileShredder as ClearIcon } from '@vicons/tabler'
import {ref} from "vue";

const editorStore = useEditorStore();

const codeCopied = ref(false);
async function onCopyClick() {
  try {
    await navigator.clipboard.writeText(editorStore.code)
    codeCopied.value = true
    setTimeout(() => {
      codeCopied.value = false
    }, 1500)
  } catch (e) {
    console.error('Failed to copy text: ', e)
  }
}

</script>

<template>
  <n-float-button :right="24" :bottom="24" :width="56" :height="56" shape="circle" menu-trigger="click" type="primary">
    <n-icon size="36"><MenuIcon /></n-icon>
    <template #menu>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle" @click="onCopyClick">
            <n-icon v-if="!codeCopied" size="24"><CopyIcon/></n-icon>
            <n-icon v-if="codeCopied" size="24"><CopiedIcon/></n-icon>
          </n-float-button>
        </template>
        <span v-if="!codeCopied">Copy</span>
        <span v-if="codeCopied">Copied!</span>
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle">
            <n-icon size="24"><ExportCodeIcon/></n-icon>
          </n-float-button>
        </template>
        Export to code
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle">
            <n-icon size="24"><DownloadIcon/></n-icon>
          </n-float-button>
        </template>
        Download Project
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle">
            <n-icon size="24"><ImportIcon/></n-icon>
          </n-float-button>
        </template>
        Import Project
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle" style="background-color: #fd2a2a">
            <n-icon size="24"><ClearIcon style="color: white"/></n-icon>
          </n-float-button>
        </template>
        Delete Project
      </n-tooltip>
    </template>
  </n-float-button>
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
