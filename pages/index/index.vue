<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="img in swiperImages" :key="img.id">
				<image :src="img.image" class="carousel"></image>
			</swiper-item>
		</swiper>
		<view class="page-block super-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">热门电影</view>
			</view>
			<scroll-view scroll-x="true" class="page-block hot">
				<view class="single-poster" v-for="poster in moviePosters" :key="poster.id">
					<view class="poster-wrapper">
						<image :src="poster.cover" class="poster"></image>
						<view class="movie-name">{{ poster.name }}</view>
						<Rate :innerScore="poster.score" showNum="1"></Rate>
						<!-- <uni-rate value="poster.score" size="15" class='rate' disabled="true"></uni-rate> -->
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="page-block trailer-hot">
			<view class="hot-title-wrapper">
				<image src="../../static/icos/interest.png" class="hot-ico"></image>
				<view class="hot-title">热门预告</view>
			</view>
			<view class="video-container page-block">
				<video :id='video.id' v-for="video in trailers" :key="video.id" :src="video.trailer" controls :poster="video.poster" @play='play'></video>
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
				trailers: []
			}
		},
		components: {
			// uniRate
			Rate
		},
		onLoad() {
			const serverUrl = common.serverUrl
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
						console.log(trailers)
					}
				}
			})
		},
		methods: {
			play:function(e){
			let currentVideo = uni.createVideoContext(e.currentTarget.id);
			currentVideo.requestFullScreen();
			}
		}
	}
</script>
<style>
	@import url('./index.css');
</style>
