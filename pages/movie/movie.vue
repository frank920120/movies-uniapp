<template>
	<view class="page" v-if='!isLoading'>
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
				<view class="score-block">
					<view class="big-score">
						<view class="score-words">综合评分 ：</view>
						<view class="movie-score">{{trailerData.score}}</view>
					</view>
					<view class="score-starts">
						<Rate :innerScore='trailerData.score' showNum=0></Rate>
						<view class="prised-counts">{{trailerData.prisedCounts}} 人点赞</view>
					</view>
				</view>
			</view>
		</view>
		<view class="line-wrapper">
			<view class="line"></view>
		</view>
		<view class="plot-block">
			<view class="plots-title">剧情介绍</view>
			<view class="plots-desc">{{trailerData.plotDesc}}</view>
		</view>
		<!-- 演员 -->
		<view class="scroll-block">
			<view class="plots-title">演职人员</view>
			<scroll-view scroll-x="true" class='scroll-list'>
				<view class="actor-wrapper" v-for='(director,index) in directorArray' :key='index'>
					<image :src="director.photo" alt='image' class='single-actor'  mode='aspectFill'></image>
					<view class="actor-name">{{director.name}}</view>
					<view class="actor-role">饰 {{director.actName}}</view>
				</view>
				<view class="actor-wrapper" v-for='(actor,index) in actorArray' :key='index'>
					<image :src="actor.photo" alt='image' class='single-actor'  mode='aspectFill'></image>
					<view class="actor-name">{{actor.name}}</view>
					<view class="actor-role">饰 {{actor.actName}}</view>
				</view>
			</scroll-view>
		</view>
		<!-- 剧照 -->
		<view class="scroll-block">
			<view class="plots-title">剧照</view>
			<scroll-view scroll-x="true" class='scroll-list'>
				<image v-for='(image,index) in plotArray' :src="image" alt='image' class='plot-image' :key='index' mode='aspectFill'></image>
			</scroll-view>
		</view>
	</view>
</template>
<script>
	import common from '../../common/helper.js';
	import Rate from '../../components/Rate/Rate.vue'
	export default {
		data() {
			return {
				trailerData: {},
				isLoading: true,
				plotArray: [],
				directorArray: [],
				actorArray: []
			}
		},
		components: {
			Rate
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
						let plotArray = JSON.parse(this.trailerData.plotPics);
						this.plotArray = plotArray;
					}
					console.log(this.trailerData);
				},
				complete: () => {
					this.isLoading = false;
					uni.hideLoading();
					uni.hideNavigationBarLoading();
				}
			})
			//directors
			uni.request({
				url: serverUrl + `/search/staff/${params.trailerId}/1?qq=806212833`,
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						this.directorArray = res.data.data;
					}
					console.log(this.directorArray);
				},
				complete: () => {
					this.isLoading = false;
					uni.hideLoading();
					uni.hideNavigationBarLoading();
				}
			})
			//actors
			uni.request({
				url: serverUrl + `/search/staff/${params.trailerId}/2?qq=806212833`,
				method: 'POST',
				success: res => {
					if (res.data.status == 200) {
						this.actorArray = res.data.data;
					}
					console.log(this.actorArray);
				},
				complete: () => {
					this.isLoading = false;
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
