<template>
	<div class="HoverContainer" :style="{
		width: width
	}">
		<div class="img_wrap">
			<slot></slot>
		</div>
		<div class="content-wrap">
			<h1 class="entry-title">
				<span class="featured-image" rel="bookmark">{{
					hoverText
				}}</span>
			</h1>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
	data() {
		return {
			left: 0,
			arr: [1,2,6,9,3,4,50,2,4,66,45]
		}
	},
	props: {
		hoverText: {
			type: String,
			default: 'McLin24',
			require: true
		},
		width: {
			type: String,
			default: '100%',
			require: true
		}
	},
	methods: {
		quickSort (arr: Array<number>): Array<number> {
			if (arr.length <= 1) return arr
			// 找到中间下标
			const middleIndex = Math.floor(arr.length / 2)
			// 找到中间值
			const middleValur = arr.splice(middleIndex, 1)[0]
			const leftArr: Array<number> = []
			const rightArr: Array<number> = []
			arr.forEach((item)=> {
				if (item < middleValur) {
					leftArr.push(item)
				} else {
					rightArr.push(item)
				}
			})
			return this.quickSort(leftArr).concat([middleValur], this.quickSort(rightArr))
		},
		interViewExperince () {
			const firstQuestion = "vue 的 $nextStick原理，为啥要有这个方法"
			const secondQuestion = "vue data里的数组，更新下标以及length长度， 页面会不会刷新， 为啥"
			const thirdQuestion = "单点登录"
		}
	}
})
</script>

<style lang="scss" scoped>
.HoverContainer {
	position: relative;
	margin: 0 auto;
	.ima_wrap {
		img {
			display: block;
		}
	}
	.content-wrap {
		padding: 0;
		position: absolute;
		text-align: center;
		width: 100%;
		top: 0;
		bottom: 0;
		display: table-cell;
		vertical-align: middle;
		overflow: hidden;
		.entry-title {
			display: table;
			font-size: 110%;
			height: 100%;
			// text-transform: uppercase;
			width: 100%;
			margin: 0;
			.featured-image {
				display: table-cell;
				position: relative;
				transition: opacity 0.3s ease-in-out,
					background 0.3s ease-in-out;
				-moz-transition: opacity 0.3s ease-in-out,
					background 0.3s ease-in-out;
				-webkit-transition: opacity 0.3s ease-in-out,
					background 0.3s ease-in-out;
				vertical-align: middle;
				z-index: 1;
				color: #fff;
				text-decoration: none;
				opacity: 0;
				padding: 10%;
				border-radius: 50%;
			}
			.featured-image:hover {
				opacity: 0.9;
				color: #fff;
				background: rgba(0, 0, 0, 0.4);
			}
		}
	}
}
</style>