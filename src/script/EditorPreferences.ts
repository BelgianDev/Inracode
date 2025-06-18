import { defineStore } from 'pinia';
import {ref} from "vue";

export const useEditorPreferences = defineStore('editor-prefs', ()  => {
    const dividerPos = ref<number>(0.7);

    return {
        dividerPos
    }
});