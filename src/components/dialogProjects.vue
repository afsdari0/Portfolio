<template>   

    <v-dialog v-model="dialog.isOpen" max-width="370">
        <v-card class="projectDialog pa-6">
            <v-parallax :src="dialog.project?.img">

            </v-parallax>
            <div>
                <h1>dialog.project?.name</h1>
                <p>dialog.project?.about</p>
                <v-btn
                    v-if="dialog.project?.link"
                    :href="dialog.project.link"
                    target="_blank"   
                    class="cert-btn"
                >
                    Acesse
                </v-btn>
            </div>
        </v-card>
    </v-dialog>
</template>
<script setup>
    import { useDialogStore } from '@/stores/dialog'
    const dialog = useDialogStore()
</script>