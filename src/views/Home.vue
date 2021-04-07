<template>
    <div class="home">
        <div class="side" v-if="!isShowSideBar">
            <i
                class="icon iconfont iconcebianlan-gerenzhongxin-weixuanzhong"
                @click="showSideBar"
            ></i>
        </div>
        <tools-tip :class="{ showSideBar: isShowSideBar }" :positionConfig="{ left: true, right: false }">
            <div v-if="isShowSideBar">
                <i
                class="icon iconfont iconguanbi iconclose"
                @click="showSideBar"
                ></i>
                <div class="sideBarTop">
                    <image-hover :width="'120px'" :hoverText="'Luffy'">
                        <img class="sideBarTop_avtar" src="../assets/img/luffyDoge.jpg" alt="">
                    </image-hover>
                    <p class="sideBarTop_name">Lin·D·YingC</p>
                    <span class="sideBarTop_label">资深海迷</span>
                </div>
                <div class="line">出航啦<i style="margin-left: 1px" class="icon iconfont iconchuan" v-for="(item, index) in 3" :key="index"></i></div>
                <div class="sideBarList">
                    <div class="list_item" v-for="item in sideBarList" :key="item.icon" @click="handleGoToImageFall(item.title)">
                        <div>
                            <span v-html="item.icon"></span>
                            <span class="list_title">{{item.title}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </tools-tip>
        <div class="img_container">
            <image-hover>
                <img class="img" style="height: 150px;" src="../assets/img/Mclin24.png" alt="" />
            </image-hover>
        </div>
        <div class="time">{{ time }}</div>
        <div class="memo">{{ timeTip }} McLin24</div>
        <div class="todo">
            <span style="cursor: pointer" @click="showTip">About</span>
            <tools-tip :class="{ actived: isShowTodo }" :positionConfig="{ left: false, right: true }">
                <template v-slot:header>
                    <image-hover :hoverText="'zoro'" :width="'80px'">
                        <img
                            v-if="isShowTodo"
                            class="img middleImg"
                            src="../assets/img//zoro.jpg"
                            alt=""
                        />
                    </image-hover>
                    <div v-if="isShowTodo" class="header">什么也没发生过</div>
                </template>
            </tools-tip>
        </div>
        <div class="queto">
            <p>A positive attitude causes a chain reaction of positive thoughts, events, and outcomes</p>
            <div class="below">
                McLin24 Fighting!!!
            </div>
        </div>
    </div>
</template>

<script lang="ts">
interface SideBarListStruct {
    icon: string;
    title: string;
}
import { defineComponent } from 'vue'
import ToolsTip from '@/components/toolsTip.vue' // @ is an alias to /src
import ImageHover from '@/components/ImageHover.vue' // @ is an alias to /src
export default defineComponent({
    data() {
        return {
            time: '',
            timeTip: 'Good morning',
            isShowTodo: false,
            isShowSideBar: false,
            // temp: {} as any,
            sideBarList: [
                {
                    icon: '<i class="icon iconfont iconshuipingzuo"></i>',
                    title: '路飞'
                }, {
                    icon: '<i class="icon iconfont iconshuangyuzuo"></i>',
                    title: '索隆'
                }, {
                    icon: '<i class="icon iconfont iconmojiezuo"></i>',
                    title: '山治'
                }, {
                    icon: '<i class="icon iconfont iconchunvzuo"></i>',
                    title: '娜美'
                }, {
                    icon: '<i class="icon iconfont iconshizizuo"></i>',
                    title: '罗宾'
                }, {
                    icon: '<i class="icon iconfont iconjuxiezuo"></i>',
                    title: '乔巴'
                }, {
                    icon: '<i class="icon iconfont icontianhezuo"></i>',
                    title: '弗兰奇'
                }, {
                    icon: '<i class="icon iconfont iconsheshouzuo"></i>',
                    title: '布鲁克'
                }, {
                    icon: '<i class="icon iconfont iconshuangzizuo"></i>',
                    title: '甚平'
                }
            ] as Array<SideBarListStruct>
        }
    },
    components: {
        ToolsTip,
        ImageHover
    },
    created() {
        this.getTimeTip()
        setInterval(this.getTimeTip, 60000)
    },
    methods: {
        getTimeTip () {
            const nowDate = new Date()
            const str =
                this.toDou(nowDate.getHours()) +
                ':' +
                this.toDou(nowDate.getMinutes())
            this.time = str
            const hour = nowDate.getHours()
            if (hour < 4) this.timeTip = 'Good night'
            if (hour >= 4 && hour <= 12) this.timeTip = 'Good morning'
            if (hour > 12 && hour <= 17) this.timeTip = 'Good afternoon'
            if (hour > 17) this.timeTip = 'Good evening'
        },
        toDou(n: number): string {
            if (n < 10) {
                return '0' + n
            } else {
                return '' + n
            }
        },
        showTip() {
            this.isShowTodo = !this.isShowTodo
        },
        showSideBar() {
            this.isShowSideBar = !this.isShowSideBar
        },
        // fibonaqie(n: number): number {
        //     if (n == 1 || n == 2) return 1
        //     if (this.temp[n]) return this.temp[n]
        //     const result: number = this.fibonaqie(n - 1) + this.fibonaqie(n - 2)
        //     return result
        // },
        handleGoToImageFall (title: string) {
            this.$router.push({
                path: '/image_fall',
                query: {
                    title
                }
            })
        }
    },
})
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
    .side {
        padding: 5px;
        width: 40px;
        height: 40px;
        text-align: center;
        color: white;
        position: absolute;
        border-radius: 50%;
        left: 50px;
        top: 50px;
        cursor: pointer;
        transition: .3s linear;
        i {
            font-size: 30px;
            line-height: 40px;
            display: block;
            margin: auto;
            transition: .3s linear;
        }
        
    }
    .side:hover {
        background: #5d4a61;
    }
    .side:hover i {
        font-size: 25px;
    }
    .showSideBar {
        overflow: scroll;
        height: 100%;
        width: 300px;
        top: 0px;
        left: 0px;
        background: #5d4a61;
        opacity: 0.9;
        .iconclose {
            font-size: 30px;
            color: white;
            cursor: pointer;
            position: absolute;
            right: 20px;
            top: 20px;
        }
        .sideBarTop {
            margin-top: 50px;
            display: flex;
            align-items: center;
            flex-direction: column;
            .sideBarTop_avtar {
                width: 120px;
                height: 120px;
                display: block;
                border-radius: 50%;
            }
            .sideBarTop_name {
                margin-top: 10px;
                font-size: 20px;
                color: white;
            }
            .sideBarTop_label {
                margin-top: 20px;
                font-size: 15px;
                padding: 5px 8px;
                border-radius: 50%;
                background: #f9be61;
                color: white;
            }
        }
        .line {
            color: white;
            padding: 0 20px 0;
            margin: 20px 0;
            line-height: 1px;
            border-left: 80px solid #ddd;
            border-right: 80px solid #ddd;
            text-align: center;
        }
        .sideBarList {
            padding: 0 30px;
            color: white;
            font-size: 20px;
            margin-top: 30px;
            .list_item {
                display: flex;
                padding: 10px;
                cursor: pointer;
                transition-duration: .4s;
                transition-property: transform;
                -webkit-tap-highlight-color: rgba(0,0,0,0);
                transform: translateZ(0);
                box-shadow: 0 0 1px rgba(0, 0, 0, 0);
                .list_title {
                    margin-left: 20px;
                }
            }
            .list_item:hover {
                font-weight: 600;
                color: #f9be61;
                transform: scale(1.1);
                background: #1c1632;
                opacity: .8;
            }
        }
    }
    .img_container {
        border: 8px solid #fbc269;
        width: 106px;
        height: 150px;
        border-radius: 50%;
        position: absolute;
        margin: 50px auto 0;
        left: 0;
        right: 0;
        top: 0;
        overflow: hidden;
    }
    .img {
        display: block;
        margin: auto;
        pointer-events: none;
    }
    .time {
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
        position: relative;
        letter-spacing: 100%;
        cursor: pointer;
    }
    .memo:before {
        content: '资深海贼迷';
        width: 0%;
        position: absolute;
        z-index: 2;
        color: white;
        white-space: nowrap;
        overflow: hidden;
        transition: 2s;
        top: 40px;
    }
    .memo:hover::before {
        width: 70%;
        color: #8b2228;
        text-align: center;
    }
    .todo {
        position: fixed;
        right: 20px;
        bottom: 20px;
        color: white;
        font-size: 20px;
        font-weight: 800;
        z-index: 3;
    }
    .actived {
        padding: 15px;
        top: -240px;
        height: 200px;
        width: 200px;
        border-radius: 10px;
        opacity: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        overflow: hidden;
        .header {
            text-align: center;
            font-size: 20px;
            color: white;
        }
        .middleImg {
            // margin: 0 auto;
            display: block;
            width: 80px !important;
            height: 80px !important;
            border-radius: 50% !important;
        }
    }
    .queto {
        padding: 30px;
        max-width: 800px;
        position: absolute;
        text-align: center;
        left: 0;
        right: 0;
        bottom: 0;
        font-size: 20px;
        color: white;
        margin: 0 auto;
        p {
            pointer-events: none;
            left: 0;
            right: 0;
            bottom: 20px;
            position: absolute;
            transition: 0.3s linear;
            z-index: 5;
        }
        .below {
            position: absolute;
            left: 0;
            right: 0;
            bottom: 30px;
            opacity: 0;
            transition: 0.3s linear;
        }
    }
    .queto:hover p{
        bottom: 50px;
    }
    .queto:hover .below {
        opacity: 1;
        bottom: 20px;
    }
}
</style>