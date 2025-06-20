import { defineStore } from 'pinia';
import {ref} from "vue";

export const useEditorStore = defineStore('editor-prefs', ()  => {
    const dividerPos = ref<number>(0.7);
    const code = ref<string>("");



    return {
        dividerPos,
        code
    }
});