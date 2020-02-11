<template>
	<view class="body">
		<form @submit="formSubmit">
			<view class="face-wapper">
				<image src="../../static/icos/default-face.png" class="face"></image>
			</view>
			<view class="info-wapper">
				<label class="words-lbl">账号</label>
				<input name="username" type="text" value="" class="input" placeholder="请输入用户名" placeholder-class="graywords" />
			</view>
			<view class="info-wapper" style="margin-top: 40upx;">
				<label class="words-lbl">密码</label>
				<input name="password" type="text" value="" password="true" class="input" placeholder="请输入密码" placeholder-class="graywords" />
			</view>
			<button type="primary" form-type="submit" style="margin-top: 60upx;width: 90%;"> 注册/登录 </button>
		</form>
		<!-- 第三方登录H5不支持，所以隐藏掉 -->
		<!-- #ifndef H5 -->
		<view class="third-wapper">
			<view class="third-line">
				<view class="single-line">
					<view class="line"></view>
				</view>
				<view class="third-words">第三方账号登录</view>
				<view class="single-line">
					<view class="line"></view>
				</view>
			</view>
			<view class="third-icos-wapper">
				<!-- 5+app 用qq/微信/微博 登录 小程序用微信小程序登录 h5不支持 -->
				<!-- #ifdef APP-PLUS -->
				<image src="../../static/icos/weixin.png" data-logintype="weixin" @click="appOAuthLogin" class="third-ico"></image>
				<image src="../../static/icos/QQ.png" data-logintype="qq" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<image src="../../static/icos/weibo.png" data-logintype="sinaweibo" @click="appOAuthLogin" class="third-ico" style="margin-left: 80upx;"></image>
				<!-- #endif -->
				<!-- #ifdef MP-WEIXIN -->
				<button open-type="getUserInfo" @getuserinfo="wxLogin" class="third-btn-ico"></button>
				<!-- #endif -->
			</view>
		</view>
		<!-- #endif -->
	</view>
</template>
<script>
	import common from '../../common/helper.js';
	export default {
		data() {
			return {
				userInfo: null,
				wxUserInfo: null
			}
		},
		methods: {
			appOAuthLogin(e) {
				let loginType = e.currentTarget.dataset.logintype;
				uni.login({
					provider: loginType,
					success: loginRes => {
						console.log(JSON.stringify(loginRes))
						uni.getUserInfo({
							provider: loginType,
							success: userinfo => {
								let nickname, face, openIdOrUid = "";
								if (loginType === 'sinaweibo') {
									nickname = userinfo.userInfo.nickname;
									face = userinfo.userInfo.avatar_hd;
									openIdOrUid = userinfo.userInfo.id;
									uni.request({
										url: common.serverUrl + `/appUnionLogin/${loginType}?qq=806212833`,
										method: 'POST',
										data: {
											nickname,
											face,
											openIdOrUidq,
										},
										success: res => {
											if (res.data.status == 200) {
												let userInfo = res.data.data;
												this.userInfo = userInfo;
												uni.setStorageSync("globalUser", userInfo);
												uni.switchTab({
													url: '../Me/Me'
												})
											} else if (res.data.status == 500) {
												let error = res.data;
												uni.showToast({
													title: error.msg,
													mask: false,
													image: '../../static/icons/error.png'
												})
											}
										}
									})
								}
							}
						})
					}
				})
			},
			formSubmit(e) {
				let {
					username,
					password
				} = e.detail.value;
				let serverUrl = common.serverUrl;
				uni.request({
					url: serverUrl + '/user/registOrLogin?qq=806212833',
					data: {
						"username": username,
						"password": password
					},
					method: 'POST',
					success: res => {
						if (res.data.status == 200) {
							let userInfo = res.data.data;
							this.userInfo = userInfo;
							uni.setStorageSync("globalUser", userInfo);
							uni.switchTab({
								url: '../Me/Me'
							})
						} else if (res.data.status == 500) {
							let error = res.data;
							uni.showToast({
								title: error.msg,
								mask: false,
								image: '../../static/icons/error.png'
							})
						}
					}
				})
			},
			wxLogin() {
				//拿取用户基本信息
				uni.getUserInfo({
					provider: 'weixin',
					success: res => {
						this.wxUserInfo = res.userInfo;
						console.log(this.wxUserInfo)
					}
				})
				uni.login({
					provider: 'weixin',
					success: result => {
						//获得授权码
						console.log(result);
						let code = result.code;
						let {
							avatarUrl,
							city,
							gender,
							nickName,
							province
						} = result;
						let loginTo = 1;
						uni.request({
							url: common.serverUrl + `/stu/mpWXLogin/${code}?qq=806212833`,
							data: {
								avatarUrl,
								nickName,
								"whichMP": loginTo
							},
							method: 'POST',
							success: userResult => {
								let userInfo = userResult.data.data;
								this.userInfo = userInfo;
								uni.setStorageSync("globalUser", userInfo);
								uni.switchTab({
									url: '../Me/Me'
								})
							}
						})
					}
				})
			}
		}
	}
</script>
<style>
	@import url("./registerLogin.css");
</style>
