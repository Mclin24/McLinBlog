<template>
  <div class="home">
    <div class="img_wrap">
      <img @click="handleClick" class="img" src="../assets/img//zoro.jpg" alt="">
    </div>
    <div class="time">{{time}}</div>
    <div class="memo">{{timeTip}} McLin24</div>
    <div class="todo">
      <span style="cursor: pointer;" @click="showTip">Todo</span>
      <tools-tip v-bind:class="{ actived: isShowTodo }"></tools-tip>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import ToolsTip from '@/components/toolsTip.vue'; // @ is an alias to /src
@Options({
  components: {
    ToolsTip
  }
})
export default class Home extends Vue {
  time = ''
  timeTip = 'Good morning'
  isShowTodo = false
  created () {
    const nowDate = new Date()
    const str = this.toDou(nowDate.getHours()) + ":" + this.toDou(nowDate.getMinutes())
    this.time = str
    setInterval(this.getTime, 60000)
  }
  getTime () {
    const nowDate = new Date()
    const str = this.toDou(nowDate.getHours()) + ":" + this.toDou(nowDate.getMinutes())
    this.time = str
    const hour = nowDate.getHours()
    if (hour < 4) this.timeTip = 'Good night'
    if (hour >= 4 && hour <= 12) this.timeTip = 'Good morning'
    if (hour > 12 && hour <= 17) this.timeTip = 'Good afternoon'
    if (hour > 17) this.timeTip = 'Good evening'
  }
  toDou(n: number): string {
    if (n < 10) {
      return '0' + n
    } else {
      return '' + n
    }
  }
  showTip () {
    console.log(this)
    this.isShowTodo = !this.isShowTodo
  }
  handleClick (e: any) {
    e.preventDefault()
  }
}
</script>

<style lang="scss" scoped>
  .home {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    background: url('../assets/img/ASL.jpg') no-repeat;
    background-size: cover;
    background-position: center 0;
    -webkit-background-size: cover;
    -o-background-size: cover;
    .img_wrap {
      border: 8px solid rgb(218, 186, 186);
      width: 150px;
      height: 150px;
      border-radius: 50%;
      position: absolute;
      margin: 50px auto 0;
      left: 0;
      right: 0;
      top: 0;
    }
    .img {
      width: 150px;
      height: 150px;
      display: block;
      border-radius: 50%;
      margin: auto;
      pointer-events: none;
    }
    .time {
      width: 600px;
      text-align: center;
      font-size: 120px;
      font-weight: 800;
      color: white;
      margin: 250px auto 0;
    }
    .memo {
      width: 600px;
      text-align: center;
      font-size: 40px;
      font-weight: 800;
      color: white;
      margin: 0 auto;
    }
    .todo {
      position: fixed;
      right: 20px;
      bottom: 20px;
      color: white;
      font-size: 20px;
      font-weight: 800;
    }
    .actived {
      top: -280px;
      opacity: 1;
    }
  }
</style>