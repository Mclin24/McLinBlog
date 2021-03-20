<template>
  <div class="tools_tip">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Vue, prop } from 'vue-class-component';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

// @Options({
//   // components: {
//   //   HelloWorld,
//   // },
// })
export default class ToolsTip extends Vue {
  // @prop({ required: true, type: String, default: 'left' }) position!: string
}
</script>

<style lang="scss" scoped>
  .tools_tip {
    background: white;
    width: 300px;
    height: 250px;
    border-radius: 10px;
    background: white;
    position: absolute;
    top: -250px;
    right: 0;
    opacity: 0;
    transition: 300ms;
  }
</style>