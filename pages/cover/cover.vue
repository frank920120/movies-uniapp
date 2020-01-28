<template>
	<view class='black'>
		<image :src='imageUrl' class='cover' mode='widthFix' @longpress="operator"></image>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				imageUrl: null
			}
		},
		methods: {
			operator() {
				uni.showActionSheet({
					itemList: ["下载图片"],
					success: res => {
						if (res.tapIndex == 0) {
							uni.showLoading({
								title:"图片保存中..."
							})
							uni.downloadFile({
								url:this.imageUrl,
								success:function(result){
									let tempFilePath = result.tempFilePath;
									uni.saveImageToPhotosAlbum({
										filePath:tempFilePath,
										success:()=>{
											uni.showToast({
												title:'保存成功',
												duration:2000
											})
										
										},
										complete:()=>{
												uni.hideLoading();
										}
									})
									
								}
							})
						}
					}
				})
			}
		},
		onLoad(params) {
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

	.cover {
		z-index: 999;
	}
</style>
