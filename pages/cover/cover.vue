<template>
	<view class='black'>
		<image :src='imageUrl' class='cover' mode='widthFix'></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageUrl: null
			}
		},
		methods: {},
		onLoad(params) {
			console.log(params)
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#000000'
			})
			this.imageUrl = params.cover
		}
	}
</script>
<style>
	.black {
		background-color: #000000;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: fixed;
		z-index: 0;
	}
	.cover{
		z-index: 999;
	}
	
</style>
