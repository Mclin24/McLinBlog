<template>
  <div class="app">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
  </div>
</template>
<style lang="scss">
  .app {
    width: 100%;
    height: 100%;
  }
</style>
