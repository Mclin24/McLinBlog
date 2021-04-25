<template>
    <div class="robotContainer">
        <div class="nav">
            <div class="logo">
                <img src="../assets/img/zoro.jpg" alt="">
            </div>
            <div class="menu">
                <ul>
                    <li>Home</li>
                    <li>STORY</li>
                    <li>ROLE</li>
                    <li>LEVEL</li>
                    <li>CONTACT</li>
                </ul>
            </div>
        </div>
        <div class="content">
            <h1>Monkey·D·Luffy</h1>
            <div class="line"></div>
            <p>Though our work, a story is told. This centralized story element is the key to eniching our work</p>
            <a href="#">LEARN MORE</a>
        </div>
        <div class="robot"></div>
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({

})
</script>
<style lang='scss' scoped>
    @keyframes anim4 {
        form {
            top: -50px;
        }
        to {
            top: 50px;
        }
    }
    @keyframes anim3 {
        form {
            left: -100%;
        }
        to {
            left: 10%;
        }
    }
    @keyframes anim2 {
        form {
            bottom: -100%;
        }
        to {
            bottom: 20%;
        }
    }
    @keyframes anim1 {
        form {
            left: 30%;
            // width: 500px;
        }
        to {
            left: 65%;
            // width: 0;
        }
    }
    .robotContainer {
        box-sizing: border-box;
        color: #c7bcba;
        background: #201f1b;
        overflow: hidden;
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        .nav {
            width: 80%;
            height: 50px;
            position: absolute;
            top: -50px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            justify-content: space-between;
            animation: anim4 2s forwards 3s;
            .logo img {
                width: 50px;
                height: 50px;
                display: inline-block;
                border-radius: 50%;
            }
            .menu li {
                list-style: none;
                color: white;
                font-weight: 700;
                display: inline-block;
                padding-left: 50px;
            }
        }
        .robot {
            width: 400px;
            height: 400px;
            background: url(../assets/img/luffyDoge.jpg);
            background-size: cover;
            position: absolute;
            bottom: -100%;
            left: 30%;
            border-radius: 50%;
            animation: anim2 2s forwards, anim1 3s forwards 3s;
        }
        // .robot::after {
        //     content: "";
        //     background: url(../assets/img/zoro.jpg);
        //     background-size: cover;
        //     position: absolute;
        //     left: 0;
        //     width: 400px;
        //     height: 400px;
        // }
        .content {
            width: 80%;
            margin: auto;
            padding-top: 50px;
            position: absolute;
            left: -100%;
            animation: anim3 2s forwards 3s;
            h1 {
                width: 50%;
                font-size: 70px;
                color: #d67208;
            }
            .line {
                width: 50%;
                height: 2px;
                background: #d67208;
                margin: 13px 0;
            }
            p {
                width: 40%;
                line-height: 1.5;
                font-size: 20px;
                font-weight: 200;
            }
            a {
                text-decoration: none;
                width: 220px;
                height: 50px;
                display: block;
                margin-top: 30px;
                font-size: 2px;
                text-align: center;
                line-height: 50px;
                background: #d67208;
                border-radius: 5px;
                color: white;
                font-weight: 700;
                font-size: 20px;
            }
        }
        
    }
</style>