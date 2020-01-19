<template>
	<view>
		<tui-card :title="makeTitle(item.title)">
			<template v-slot:body>
				<view class="tui-default" @tap='gotoProblem(item.objectId)'>
					{{item.content}}
				</view>
			</template>
			<template v-slot:footer>
				<view class="tui-default">
					<button class='shareBtn' open-type="share" :data-id="item.objectId">分享</button>
				</view>
			</template>
		</tui-card>
	</view>
</template>

<script>
	import tuiCard from "@/components/card/card"
	export default {
		components: {
			tuiCard
		},
		data() {
			return {
				item: {}
			};
		},
		methods: {
			makeTitle(t) {
				return {
					'text': t,
					'size': '40'
				}
			}
		},
		onLoad() {
			console.log(this.$mp.query)
			const query = this.Bmob.Query('jokes');
			query.get(this.$mp.query.id).then(res => {
				// console.log(res)
				this.item = res
			}).catch(err => {
				console.log(err)
			})
		},
		onShareAppMessage: function(options) {
			let eData = options.target.dataset;
			console.log(eData)
			console.log('分享的代码！！')
			return {
				path: `pages/joke/joke?id=${eData.id}`,
				title: '这个笑话很好玩'
			}
		}
	}
</script>

<style lang="scss">
	.tui-title {
		width: 100%;
		padding: 20upx 20upx 20upx 20upx;
		box-sizing: border-box;
		font-size: 18px;
		line-height: 30upx;
		color: #666;
	}

	.tui-default {
		padding: 10upx 10upx;
		font-size: 14px;
	}
	
	.shareBtn {
		width: 120upx;
		height: 60upx;
		font-size: 10px;
	}
</style>
