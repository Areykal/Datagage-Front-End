<template>
  <v-dialog v-model="dialog" max-width="400px">
    <v-card class="confirm-dialog">
      <v-card-title class="text-h5 pb-2">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn variant="plain" @click="cancel">Cancel</v-btn>
        <v-btn :color="confirmColor" :loading="loading" @click="confirm">{{
          confirmText
        }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  title: { type: String, required: true },
  message: { type: String, required: true },
  confirmText: { type: String, default: "Confirm" },
  confirmColor: { type: String, default: "error" },
  loading: { type: Boolean, default: false },
});

const emit = defineEmits(["confirm", "cancel"]);
const dialog = ref(false);

const show = () => (dialog.value = true);
const confirm = () => emit("confirm");
const cancel = () => {
  dialog.value = false;
  emit("cancel");
};

defineExpose({ show });
</script>

<style scoped>
.confirm-dialog {
  background: linear-gradient(145deg, var(--dark-surface), #1a1a1a) !important;
  border: 1px solid var(--dark-border) !important;
}
</style>
