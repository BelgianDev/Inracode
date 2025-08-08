<script setup lang="ts">
import {NCard, NFloatButton, NIcon, NModal, NP, NSplit, NText, NTooltip, NUpload, NUploadDragger, useDialog, NDescriptions, NDescriptionsItem, NDivider, NButton, NSpace, NAlert} from 'naive-ui';
import BlockEditor from "./editor/BlockEditor.vue";
import CodeViewer from "./editor/CodeViewer.vue";
import {useEditorStore} from "../script/editor/EditorStore.ts";
import {
  CircleCheck as CopiedIcon,
  FileCode as ExportCodeIcon,
  FileDownload as DownloadIcon,
  FileImport as ImportIcon,
  Files as CopyIcon,
  FileShredder as ClearIcon,
  Menu2 as MenuIcon
} from '@vicons/tabler'
import {ref, watch} from "vue";
import type {ProjectFile} from "../script/editor/format/ProjectFile.ts";

const editorStore = useEditorStore();
const dialog = useDialog();

const showImportModal = ref(false);
const importedFile = ref<ProjectFile | null>(null);

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

function downloadAsCode() {
  const blob = new Blob([editorStore.code], {type: 'text/plain'});
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'main.ino';
  link.click();

  URL.revokeObjectURL(url);
}

function exportProject() {
  const blob = new Blob([JSON.stringify(editorStore.exportWorkspace())], {type: 'application/json'});
  const url = URL.createObjectURL(blob);

  const link = document.createElement('a');
  link.href = url;
  link.download = 'project.code';
  link.click();

  URL.revokeObjectURL(url);
}

function clearProject() {
  dialog.warning({
    title: 'Confirm',
    content: "Are you sure ?\nThis will delete everything forever. (That's a really long time!)",
    positiveText: 'Delete Project',
    negativeText: 'Cancel',
    draggable: true,
    onPositiveClick: () => {
      editorStore.clearEditor();
    },
    onNegativeClick: () => {}
  })
}

async function handleProjectUpload(fileList: Array<{ file: File }>) {
  if (fileList.length === 0) {
    return;
  }

  const uploadedFile = fileList[0].file;

  try {
    const text = await uploadedFile.text();
    importedFile.value = JSON.parse(text);
  } catch (error) {
    console.error('Error processing file:', error);
  }
}

function handleImport() {
  if (!importedFile.value)
    return;

  editorStore.importWorkspace(importedFile.value);
  showImportModal.value = false;
  importedFile.value = null;
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  });
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
          <n-float-button :width="48" :height="48" shape="circle" @click="downloadAsCode">
            <n-icon size="24"><ExportCodeIcon/></n-icon>
          </n-float-button>
        </template>
        Export to code
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle" @click="exportProject">
            <n-icon size="24"><DownloadIcon/></n-icon>
          </n-float-button>
        </template>
        Download Project
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle" @click="showImportModal = true">
            <n-icon size="24"><ImportIcon/></n-icon>
          </n-float-button>
        </template>
        Import Project
      </n-tooltip>
      <n-tooltip trigger="hover" placement="left">
        <template #trigger>
          <n-float-button :width="48" :height="48" shape="circle" style="background-color: #fd2a2a" @click="clearProject">
            <n-icon size="24"><ClearIcon style="color: white"/></n-icon>
          </n-float-button>
        </template>
        Delete Project
      </n-tooltip>
    </template>
  </n-float-button>
  <n-modal v-model:show="showImportModal">
    <n-card style="width: 900px" title="Import Project" :bordered="false" size="huge" role="dialog" aria-modal="true">
      <n-alert class="status-card" title="Warning!" :type="'warning'">
        This operation will replace the current project, and everything will be lost!
      </n-alert>
      <n-divider/>
      <n-upload :multiple="false" :max="1" default-upload accept=".code" :on-update-file-list="handleProjectUpload">
        <n-upload-dragger>
          <div style="margin-bottom: 12px">
            <n-icon size="48" :depth="3">
              <ImportIcon/>
            </n-icon>
          </div>
          <n-text style="font-size: 16px">
            Click or drag a project file to import.
          </n-text>
          <n-p depth="3" style="margin: 8px 0 0 0">
            You can only upload one project file!
          </n-p>
        </n-upload-dragger>
      </n-upload>
      <n-divider/>
      <n-descriptions v-if="importedFile">
        <n-descriptions-item>
          <template #label>
            Export Date
          </template>
          {{ importedFile && importedFile.exportDate ? formatDate(importedFile.exportDate) : "Undefined" }}
        </n-descriptions-item>
      </n-descriptions>
      <n-divider/>
      <n-space>
        <n-button @click="showImportModal = false">Cancel</n-button>
        <n-button @click="handleImport" :disabled="!importedFile" type="primary">Import</n-button>
      </n-space>
    </n-card>
  </n-modal>
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
