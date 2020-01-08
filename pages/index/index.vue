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
	methods: {}
};
</script>

<style>
@import url('./index.css');
</style>
