<template>
  <v-app id="app" app>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </v-app>
</template>
<script setup lang="ts">
/*if (useRoute().name === "index") {
  navigateTo({
    name: "index-overview",
  });
}*/
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Khula:wght@400;600;700&display=swap");
@import "./assets/styles/common";
#app {
  font-family: "Khula", sans-serif !important;
}
.text-slate-300 {
  color: $text-slate-300;
}
.text-slate-400 {
  color: $text-slate-400;
}
.text-slate-500 {
  color: $text-slate-500;
}
.text-slate-600 {
  color: $text-slate-600;
}

.Vue-Toastification__toast.Vue-Toastification__toast--success {
  background-color: $success;
}
.Vue-Toastification__toast.Vue-Toastification__toast--error {
  background-color: $error;
}
</style>
