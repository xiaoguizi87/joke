<template>
	<view class="container">
		<view class="list-view">
			<view v-for="(item,index) in jokesList" :key="index" class="list-cell list-item" :class="[(jokesList.length-1)==index?'last':'']"
			 hover-class="hover" :hover-stay-time="150" @tap="detail">
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
		</view>
		<!--加载loadding-->
		<tui-loadmore :visible="loadding"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn"></tui-nomore>
		<!--加载loadding-->
	</view>
</template>

<script>
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiCard from "@/components/card/card"
	export default {
		components: {
			tuiLoadmore,
			tuiNomore,
			tuiCard
		},
		data() {
			return {
				card: [{
					img: {
						url: "/static/images/news/avatar_1.jpg"
					},
					title: {
						text: "CSDN云计算"
					},
					tag: {
						text: "1小时前"
					},
					header: {
						bgcolor: "#F7F7F7",
						line: true
					}
				}],
				pageIndex: 1,
				jokesList: [],
				loadData: [],
				// jokesList: [{
				// 	title: "CSDN云计算",
				// 	img: 1,
				// 	source: "央视新闻网",
				// 	label: 1
				// }, {
				// 	title: '3.07财经早报┃头条：推进改革开放创新增进民生福祉，促进经济社会持续健康发展促进经济社会持续健康发展',
				// 	img: 0,
				// 	source: "百科故事大全",
				// 	label: 0
				// }, {
				// 	title: '哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列',
				// 	img: 0,
				// 	source: "粤港精英联盟",
				// 	label: 2
				// }, {
				// 	title: '触手直播“和平精英”星联赛Jstar夺冠 大热',
				// 	img: 1,
				// 	source: "央视新闻网",
				// 	label: 0
				// }, {
				// 	title: '开户大战燎原！加急上线科创板预约开户',
				// 	img: 2,
				// 	source: "百科故事大全",
				// 	label: 4
				// }, {
				// 	title: '科创板交易系统准备就绪,不存在首批名单',
				// 	img: 0,
				// 	source: "百科故事大全",
				// 	label: 1
				// }, {
				// 	title: '美国会表决通过新驻华大使 月底有望赴华',
				// 	img: 4,
				// 	source: "粤港精英联盟",
				// 	label: 0
				// }, {
				// 	title: '哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列',
				// 	img: 1,
				// 	source: "粤港精英联盟",
				// 	label: 4
				// }, {
				// 	title: '温故知"心"习近平这些话要牢记',
				// 	img: 0,
				// 	source: "央视新闻网",
				// 	label: 3
				// }, {
				// 	title: '科创板交易系统准备就绪,不存在首批名单',
				// 	img: 5,
				// 	source: "央视新闻网",
				// 	label: 2
				// }],
				// loadData: [{
				// 	title: '温故知"心"习近平这些话要牢记',
				// 	img: 1,
				// 	source: "央视新闻网",
				// 	label: 1
				// }, {
				// 	title: '3.07财经早报┃头条：推进改革开放创新增进民生福祉，促进经济社会持续健康发展促进经济社会持续健康发展',
				// 	img: 2,
				// 	source: "百科故事大全",
				// 	label: 2
				// }, {
				// 	title: '哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列',
				// 	img: 0,
				// 	source: "粤港精英联盟",
				// 	label: 0
				// }, {
				// 	title: '触手直播“和平精英”星联赛Jstar夺冠 大热',
				// 	img: 0,
				// 	source: "央视新闻网",
				// 	label: 3
				// }, {
				// 	title: '开户大战燎原！加急上线科创板预约开户',
				// 	img: 2,
				// 	source: "百科故事大全",
				// 	label: 4
				// }, {
				// 	title: '科创板交易系统准备就绪,不存在首批名单',
				// 	img: 0,
				// 	source: "百科故事大全",
				// 	label: 1
				// }, {
				// 	title: '美国会表决通过新驻华大使 月底有望赴华',
				// 	img: 4,
				// 	source: "粤港精英联盟",
				// 	label: 0
				// }, {
				// 	title: '哪些专业毕业后收入高?计算机、金融专业排前列金融专业排前列',
				// 	img: 1,
				// 	source: "粤港精英联盟",
				// 	label: 4
				// }, {
				// 	title: '温故知"心"习近平这些话要牢记',
				// 	img: 3,
				// 	source: "央视新闻网",
				// 	label: 0
				// }, {
				// 	title: '科创板交易系统准备就绪,不存在首批名单',
				// 	img: 5,
				// 	source: "央视新闻网",
				// 	label: 2
				// }],
				loadding: false,
				pullUpOn: true
			}
		},
		onLoad() {
			const query = this.Bmob.Query('jokes');
			query.order("-updatedAt")
			query.find().then(res => {
				console.log(res)
				console.log(res.length)
				this.jokesList = res
			}).catch(err => {
				console.log(err)
			})
		},
		methods: {
			makeTitle(t) {
				return {
					'text': t,
					'size': '40'
				}
			},
			detail(e) {
				uni.navigateTo({
					url: '../extend-view/newsDetail/newsDetail'
				})
			},
			getLabelText: function(label) {
				return ["", "要闻", "朋友都看过", "本地资讯", "互联网精英看过"][label];
			},
			getLabelCss: function(label) {
				return ["", "b-red", "b-blue", "b-orange", "b-green"][label];
			},
			gotoProblem(itemId) {
				console.log(itemId)
				uni.navigateTo({
					url: `/pages/joke/joke?id=${itemId}`
				})
			},
		},
		//页面相关事件处理函数--监听用户下拉动作
		onPullDownRefresh: function() {
			//延时为了看效果
			setTimeout(() => {
				this.jokesList = this.loadData;
				this.pageIndex = 1;
				this.pullUpOn = true;
				this.loadding = false;
				uni.stopPullDownRefresh();
				this.tui.toast("刷新成功");
			}, 200)
		},

		// 页面上拉触底事件的处理函数
		onReachBottom: function() {
			if (!this.pullUpOn) return;
			this.loadding = true;
			if (this.pageIndex == 3) {
				this.loadding = false;
				this.pullUpOn = false;
			} else {
				this.jokesList = this.jokesList.concat(this.loadData);
				this.pageIndex = this.pageIndex + 1;
			}
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

<style>
	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.list-view {
		width: 100%;
		background: #fff;
		box-sizing: border-box;
	}

	.list-cell {
		padding: 30upx 32upx;
		box-sizing: border-box;
	}

	.cell-title-box {
		position: relative;
	}

	.min {
		min-height: 90upx
	}

	.cell-title {
		padding-right: 172upx;
		font-size: 36upx;
		line-height: 56upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
	}

	.pdr0 {
		padding-right: 0 !important;
	}

	.img {
		position: absolute;
		right: 0;
		top: 6upx;
		width: 146upx;
		height: 146upx;
		border-radius: 4upx;
	}

	.sub-title {
		padding-top: 24upx;
		font-size: 28upx;
		color: #BCBCBC;
		display: flex;
		align-items: center
	}

	.tag {
		padding: 5upx 10upx;
		font-size: 24upx;
		border-radius: 4upx;
		margin-right: 20upx;
	}

	.b-red {
		background: #FCEBEF;
		color: #8A5966;
	}

	.b-blue {
		background: #ECF6FD;
		color: #4DABEB;
	}

	.b-orange {
		background: #FEF5EB;
		color: #FAA851
	}

	.b-green {
		background: #E8F6E8;
		color: #44CF85
	}

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

	.tui-article {
		position: relative;
	}

	.shareBtn {
		width: 120upx;
		height: 60upx;
		font-size: 10px;
	}
</style>
