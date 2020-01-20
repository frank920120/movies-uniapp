<template>
	<view class='page'>
		<view class="search-block">
			<view class="search-ico-wrapper">
				<image src="../../static/icos/search.png" class='search-icon'></image>
			</view>
			<input 
			type="text" 
			confirm-type="search"
			placeholder="搜索预告" 
			maxlength="10" 
			class="search-text" 
			focus 
			@confirm='searchHandle' />
		</view>
		<view>
			<view class="movie-lists page-block">
				<view class='movie-wrapper' v-for='trailer in trailersData' :key='trailer.id'>
					<img  :src="trailer.cover" alt="image" class='poster'  >
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
				trailersData: [],
				// filteredData: [],
				page:1,
				totalPages:1,
				keywords:''
			}
		},
		onLoad() {
			const serverUrl = common.serverUrl;
			uni.showLoading({
				mask:true,
				title:'请稍后...'
			})
			uni.showNavigationBarLoading();
			uni.request({
				url: serverUrl + '/search/list?keywords=&page=&pageSize=&qq=806212833',
				method: 'POST',
				success: res => {
					console.log(res.data)
					if (res.data.status == 200) {
						this.trailersData = res.data.data.rows
						// this.filteredData = this.trailersData
					}
				},
				complete:()=>{
					uni.hideNavigationBarLoading();
					uni.hideLoading();
				}
			})
		},
		onReachBottom(){
			let page  = this.page + 1;
			let keywords =this.keywords;
			let totalPages = this.totalPages;
			if(page>totalPages){
				return;
			}
			this.pagedTrailerList(keywords,page,15)
		},
		methods: {
			pagedTrailerList(keywords,page,pageSize){
	
				const serverUrl = common.serverUrl;
				uni.showLoading({
					mask:true,
					title:'请稍后...'
				})
				uni.showNavigationBarLoading();
				uni.request({
					url: serverUrl + `/search/list?keywords=${keywords}&page=${page}&pageSize=${pageSize}&qq=806212833`,
					method: 'POST',
					success: res => {
						console.log(res.data)
						if (res.data.status == 200) {
							const tempList = res.data.data.rows;
							this.trailersData = [...this.trailersData,...tempList]
							this.totalPages = res.data.data.total;
							this.page = res.data.data.page;
						}
					},
					complete:()=>{
						uni.hideNavigationBarLoading();
						uni.hideLoading();
					}
				})
			},
			searchHandle: function(e) {
				const value =  e.detail.value;
				this.keywords = value;
				this.trailersData = [];
				this.pagedTrailerList(value,1,15);				
				// this.filteredData = this.trailersData.
				// filter(trailer => trailer.name.toLowerCase().includes(this.keywords) || trailer.originalName.toLowerCase().includes(this.keywords))
			}
		}
	}
</script>
<style>
	@import url("search.css");
</style>
