<template>
	<view class="page">
		<view class='player'>
			<video :src="trailerData.trailer" :poster='trailerData.poster' controls class='movie' @play='play'></video>
		</view>
		<view class="movie-info">
			<image :src="trailerData.cover" class='cover'></image>
			<view class="movie-desc">
				<view class="title">
					{{trailerData.name}}
				</view>
				<view class="basic-info ">
					{{trailerData.basicInfo}}
				</view>
				<view class="basic-info ">
					{{trailerData.originalName}}
				</view>
				<view class="basic-info ">
					{{trailerData.totalTime}}
				</view>
				<view class="basic-info ">
					{{trailerData.releaseDate}}
				</view>
				<view class="score-block"></view>
			</view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/helper.js';
	export default {
		data() {
			return {
				trailerData: {}
			}
		},
		onLoad(params) {
			const serverUrl = common.serverUrl;
			uni.showLoading({
				mask: true,
				title: '请稍后...'
			})
			uni.showNavigationBarLoading();
			uni.request({
				url: serverUrl + `/search/trailer/${params.trailerId}?qq=806212833`,
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						this.trailerData = res.data.data;
					}
					console.log(this.trailerData)
				},
				complete: () => {
					uni.hideLoading();
					uni.hideNavigationBarLoading();
				}
			})
		},
		methods: {
			play: function(e) {
				let currentVideo = uni.createVideoContext(e.currentTarget.id);
				currentVideo.requestFullScreen();
			}
		}
	}
</script>
<style>
	@import url("movie.css");
</style>
