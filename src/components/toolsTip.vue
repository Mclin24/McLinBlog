<template>
  <div
    class="tools_tip"
    :class="{ rightTip: positionConfig.right, leftTip: positionConfig.left }"
  >
    <slot name="header"></slot>
    <slot></slot>
  </div>
</template>
<script lang="ts">
interface PositionStruct {
  left: boolean
  right: boolean
}
import { defineComponent, PropType } from 'vue'
export default defineComponent({
  data() {
    return {
      left: 0
    }
  },
  props: {
    positionConfig: {
      type: Object as PropType<PositionStruct>,
      required: true
    }
  }
})
</script>

<style lang="scss" scoped>
.tools_tip {
  padding: 0px;
  background: white;
  width: 0px;
  height: 0px;
  background: #a43525;
  position: absolute;
  top: 0px;
  right: 0;
  opacity: 0;
  transition: 300ms;
  z-index: 10;
}
.rightTip {
  right: 0;
}
.leftTip {
  left: 0;
}
</style>
