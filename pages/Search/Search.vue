<template>
	<view class='page'>
		<view class="search-block">
			<view class="search-ico-wrapper">
				<image src="../../static/icos/search.png" class='search-icon'></image>
			</view>
			<input type="text" value="" placeholder="搜索预告" maxlength="10" class="search-text" focus @input='searchHandle' />
		</view>
		<view>
			<view class="movie-lists page-block">
				<view class='movie-wrapper' v-for='trailer in filteredData' :key='trailer.id'>
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
				filteredData: [],
			}
		},
		onLoad() {
			const serverUrl = common.serverUrl;
			uni.request({
				url: serverUrl + '/search/list?keywords=&page=&pageSize=&qq=806212833',
				method: 'POST',
				success: res => {
					console.log(res.data)
					if (res.data.status == 200) {
						this.trailersData = res.data.data.rows
						this.filteredData = this.trailersData
					}
				}
			})
		},
		methods: {
			searchHandle: function(e) {
				const input = e.detail.value.toLowerCase();
				this.filteredData = this.trailersData.
				filter(trailer => trailer.name.toLowerCase().includes(input) || trailer.originalName.toLowerCase().includes(input))
			}
		}
	}
</script>
<style>
	@import url("search.css");
</style>
