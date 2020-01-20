<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="img in swiperImages" :key="img.id">
					
					<image :src="img.image" class="carousel"></image>
				</navigator>
				
			</swiper-item>
		</swiper>
	<!-- 	//hot movies -->
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">热门电影</view>
			</view>
			<scroll-view scroll-x="true" class="page-block hot">
				<view class="single-poster" v-for="poster in moviePosters" :key="poster.id">
					<view class="poster-wrapper">
						<navigator open-type="navigate" :url="'../movie/movie?trailerId='+ poster.id">
						<image :src="poster.cover" class="poster"></image>
						</navigator>
						<view class="movie-name">{{ poster.name }}</view>
						<Rate :innerScore="poster.score" showNum="1"></Rate>
						<!-- <uni-rate value="poster.score" size="15" class='rate' disabled="true"></uni-rate> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- //trailer -->
		<view class="page-block trailer-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">热门预告</view>
			</view>
		</view>
		<view class="video-container page-block">
			<video
			 :id='video.id'
			 v-for="video in trailers" 
			 :key="video.id" 
			 :src="video.trailer" 
			 controls 
			 :poster="video.poster" 
			 @play='play'></video>
		</view>
		<!-- //guess what ppl like -->
		<view class="page-block trailer-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/guess-u-like.png" class="hot-ico"></image>
				<view class="hot-title">猜你喜欢</view>
			</view>
		</view>
		<view class="page-block guess-u-like">
			<view class="single-like-movie" v-for='(like,index) in ulike' :key='like.id'>
					<navigator open-type="navigate" :url="'../movie/movie?trailerId='+ like.id">
					<image :src="like.cover" class='like-movie'></image>
					</navigator>
					<view class="movie-desc">
							<view class="movie-title">{{like.name}}</view>
							<Rate :innerScore="like.score" showNum="0"></Rate>
							<view class="movie-info">
								{{like.basicInfo}}
							</view>
							<view class="movie-info">
								{{like.releaseDate}}
							</view>
					</view>
			
					<view class="oper" @tap='praiseHandler($event,index)'>
						<image src="../../static/icos/praise.png" class="praise-icon" ></image>
						<view class="praise-me">点赞一下</view>
						<view class="praise-me animation-opacity" :animation="animationDataArray[index]">+1</view>
					</view>
				
				

			</view> 
		</view>
	</view>
</template>
<script>
	import common from '../../common/helper.js'
	// import uniRate from "@/components/uni-rate/uni-rate.vue"
	import Rate from '../../components/Rate/Rate.vue'
	export default {
		data() {
			return {
				swiperImages: [],
				moviePosters: [],
				trailers: [],
				ulike:[],
				animationData:{},
				animationDataArray:[
					{},{},{},{},{}
				]
			}
		},
		components: {
			// uniRate
			Rate
		},
		onUnload(){
			this.animationData = {}
			this.animationDataArray=[
				{},{},{},{},{}
			]
		},
		onPullDownRefresh(){
			this.refresh();
		},
		onLoad() {
			const serverUrl = common.serverUrl;
			// #ifdef APP-PLUS || MP-WEIXIN
					this.animation = uni.createAnimation();
			// #endif
			//swiper api
			uni.request({
				url: serverUrl + '/index/carousel/list?qq=806212833',
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						const movieData = res.data.data
						this.swiperImages = movieData
					}
				},
				fail: err => {
					console.log(err)
				}
			})
			//movie poster api
			uni.request({
				url: serverUrl + '/index/movie/hot?type=superhero&qq=806212833',
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						const moviePosters = res.data.data
						this.moviePosters = moviePosters
						this.rate = moviePosters.score
					}
				}
			})
			//movie trailer api
			uni.request({
				url: serverUrl + '/index/movie/hot?type=trailer&qq=806212833',
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						const trailers = res.data.data
						this.trailers = trailers

					}
				}
			})
			//guess u like api 
			this.refresh();
		},
		methods: {
			play:function(e){
			let currentVideo = uni.createVideoContext(e.currentTarget.id);
			currentVideo.requestFullScreen();
			},
			praiseHandler:function(e,index){
			
				// const index = e.currentTarget.dataset.index;
				// #ifdef APP-PLUS || MP-WEIXIN
				this.animation.translateY(-60).opacity(1).step({
					duration:400
				});
				this.animationData = this.animation
				this.animationDataArray[index] = this.animationData.export();
				setTimeout(()=>{
					this.animation.translateY(0).opacity(0).step({
					duration:0
					})
					this.animationDataArray[index] =this.animationData.export();
				},500)
			//#endif
		
		},
		refresh(){
			uni.showLoading({
				mask:true
			})
			const serverUrl = common.serverUrl;
			uni.request({
				url: serverUrl + '/index/guessULike?qq=806212833',
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						const ulike = res.data.data
						this.ulike = ulike
			
					}
				},
				complete:()=>{
					uni.hideLoading()
					uni.stopPullDownRefresh();
				}
			})
		}
		}
	
	}
</script>
<style>
	@import url('./index.css');
</style>
