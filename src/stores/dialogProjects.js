import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDialogStore = defineStore('dialog', () => {
    const isOpen = ref(false) 
    const project = ref(null) 

    function openDialog(p) {
        project.value = p
        isOpen.value = true
    }

    function closeDialog() {
        isOpen.value = false
        project.value = null
    }

    return { isOpen, project, openDialog, closeDialog }
})