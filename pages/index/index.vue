<template>
	<view class="page">
		<swiper :indicator-dots="true" :autoplay="true" class="carousel">
			<swiper-item v-for="img in swiperImages" :key="img.id"><image :src="img.image" class="carousel"></image></swiper-item>
		</swiper>
		<view class='page-block super-hot'>
			<view class="hot-title-wrapper">
				<image src="../../static/icos/hot.png" class="hot-ico"></image>
				<view class="hot-title">
					热门电影
				</view>	
			</view>
			<scroll-view scroll-x="true" @scrolltoupper="scrollLeft" @scrolltolower="scrollRight" class='page-block hot'>
				<view class="single-poster">
					<view class="poster-wrapper">
						<image src="../../static/poster/civilwar.jpg" class="poster"></image>
						<view class="movie-name">
							褊狭褊狭褊狭褊狭褊狭褊狭褊狭
						</view>
						<view class="">
							
						</view>
					</view>
				</view>
				<view class="single-poster">
					<view class="poster-wrapper">
						<image src="../../static/poster/civilwar.jpg" class="poster"></image>
						<view class="movie-name">
							褊狭褊狭褊狭褊狭褊狭褊狭褊狭
						</view>
						<view class=""></view>
					</view>
				</view>
				<view class="single-poster">
					<view class="poster-wrapper">
						<image src="../../static/poster/civilwar.jpg" class="poster"></image>
						<view class="movie-name">
							褊狭褊狭褊狭褊狭褊狭褊狭褊狭
						</view>
						<view class="movie-score-wrapper">
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-gray.png" class="star-icon"></image>
							<view class="movie-score">9.1</view>
						</view>
					</view>
				</view>
			
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
import common from '../../common/helper.js';
export default {

	data() {
		return {
			swiperImages: []
		};
	},
	onLoad() {
	 const serverUrl = common.serverUrl
		uni.request({
			url: serverUrl+'/index/carousel/list?qq=806212833',
			method: 'POST',
			success: res => {
				if(res.data.status==200){
					const movieData = res.data.data;
					this.swiperImages = movieData;
				}
			},
			fail: err => {
				console.log(err);
			}
		});
	},
	methods: {
		scrollLeft:function(e){
			console.log(e)
		},
		scrollRight:function(e){
			console.log(e)
		}
	}
};
</script>

<style>
@import url('./index.css');
</style>
