<template>
	<view class='page page-fill'>
		<form @submit="formSubmitNickName" >
			<view class="page-block" style="margin-top: 20upx;">
				<input type="text" 
				:value="globalUser.nickname" 
				name='nickname' 
				class="input" 
				placeholder="请输入昵称"
				placeholder-class="graywords"
				maxlength="10"/>
			</view>
			<button type="primary" form-type="submit" class='submitBtn'>提交</button>
		</form>
	</view>
</template>

<script>
	import common from '../../common/helper.js';
	export default {
		data() {
			return {
				globalUser:{}
			}
		},
		onLoad(){
			let userInfo=uni.getStorageSync('globalUser');
			this.globalUser = userInfo
		},
		methods: {
			formSubmitNickName(e){
				let nickname = e.detail.value.nickname;
				uni.request({
					url:common.serverUrl + '/user/modifyUserinfo?qq=806212833',
					data:{
						userId : this.globalUser.id,
						nickname
					},
					header: {
						"headerUserId": this.globalUser.id,
						"headerUserToken": this.globalUser.userUniqueToken
					},
					method:'POST',
					success:res=>{
						console.log(res);
						var resData = res.data;
					
						if (resData.status == 200) {
							// 获得最新的用户数据
						
							var userInfo = resData.data;
							uni.setStorageSync("globalUser", userInfo);
							uni.navigateBack({
								delta: 1
							})
						} else if (resData.status == 502 || resData.status == 500) {
							uni.showToast({
								title: res.data.msg,
								image: "../../static/icos/error.png",
								duration: 2000
							})
						}
					}
				})
			}
		}
	}
</script>

<style>
.page-fill {
	width:100%;
	height: 100%;
	position: absolute;
}

.graywords {
	color: #EAEAEA;
}

.input {
	height: 80upx;
	line-height: 80upx;
	width: 500upx;
	margin-left: 40upx;
}

.submitBtn {
	width: 95%;
	margin-top: 40upx;
}
</style>
