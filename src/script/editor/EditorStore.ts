import { defineStore } from 'pinia';
import {ref} from "vue";
import {Workspace, serialization, getMainWorkspace} from "blockly";
import type {ProjectFile} from "./format/ProjectFile.ts";
import * as IDB from "../idb.ts";

const WORKSPACE_IDENTIFIER = "workspace";

export const useEditorStore = defineStore('editor-prefs', ()  => {
    const dividerPos = ref<number>(0.7);
    const code = ref<string>("");
    const workspace = ref<Workspace | null>(null);

    function clearEditor() {
        if (workspace.value)
            serialization.workspaces.load({}, workspace.value) // This will also clear the code variables
        else
            code.value = ""; // Still reset the code, if for some reason It's loaded but not the workspace.

        console.log("Cleared editor.");
    }

    function exportWorkspace(): ProjectFile {
        const data: any = serializeWorkspace();
        const exportDate = new Date().toISOString();

        return {
            exportDate,
            data
        }
    }

    function importWorkspace(project: ProjectFile) {
        if (!workspace.value)
            return;

        const data = project.data;
        serialization.workspaces.load(data, getMainWorkspace()) // Quick Patch: getMainWorkspace works while getting the ref doesn't, why ? I don't know. -> https://github.com/google/blockly/issues/7055
    }

    function serializeWorkspace(): any {
        return serialization.workspaces.save(workspace.value)
    }

    async function loadSavedWorkspace() {
        if (!workspace.value)
            return

        const serializedWorkspace = await IDB.loadWorkspace(WORKSPACE_IDENTIFIER);
        serialization.workspaces.load(serializedWorkspace, getMainWorkspace())
    }

    async function saveWorkspace() {
        if (!workspace.value)
            return

        const serializedWorkspace = serializeWorkspace();
        await IDB.saveWorkspace(WORKSPACE_IDENTIFIER, serializedWorkspace);
    }

    return {
        dividerPos,
        code,
        workspace,

        clearEditor,
        exportWorkspace,
        importWorkspace,

        loadSavedWorkspace,
        saveWorkspace
    }
});