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
			<scroll-view scroll-x="true"  class='page-block hot'>
				<view class="single-poster" v-for='poster in moviePosters' :key="poster.id">
					<view class="poster-wrapper">
						<image :src="poster.cover" class="poster"></image>
						<view class="movie-name">
							{{poster.name}}
						</view>
						<view class="movie-score-wrapper">
							<!-- <uni-rate value="poster.score" size="15" class='rate' disabled="true"></uni-rate> -->
							<image src="../../static/icos/star-yellow.png" class="star-icon"></image>
							<image src="../../static/icos/star-gray.png" class="star-icon"></image>
							<view class="movie-score">{{poster.score}}</view>
						</view>
					</view>
				</view>
			
			</scroll-view>
			
		</view>
	</view>
</template>

<script>
import common from '../../common/helper.js';
// import uniRate from "@/components/uni-rate/uni-rate.vue"
export default {

	data() {
		return {
			swiperImages: [],
			moviePosters:[],
		};
	},
	components:{
		// uniRate
	},
	onLoad() {
	 const serverUrl = common.serverUrl
	 //swiper api
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
		//movie poster api
		uni.request({
			url:serverUrl+'/index/movie/hot?type=superhero&qq=806212833',
			method:'POST',
			success:res=>{
				if(res.data.status==200){
					const moviePosters = res.data.data;
					this.moviePosters = moviePosters;
					this.rate = moviePosters.score
				}
			}
		})
		
	},
	methods: {
		
	}
};
</script>

<style>
@import url('./index.css');
</style>
