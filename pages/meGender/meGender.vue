<template>
	<view class='page-fill page'>
		<radio-group @change="checkBoxChange">
			<label v-for='(gender,index) in genders' :key='index'>
				<radio :value="gender.value" :checked="gender.checked"/>
				<text>{{gender.value}}</text>
			</label>
		</radio-group>
		<button type="primary" class='submitBtn' @click="formSubmitGender">提交</button>
	</view>
</template>

<script>
	import common from '../../common/helper.js'
	export default {
		data() {
			return {
				genders:[
					{value:'男',checked:false},
					{value:'女',checked:false}
				],
				currentGender:null,
				globalUser : null
			}
		},
		onLoad(){
			let userInfo = uni.getStorageSync('globalUser');
			this.globalUser = userInfo
		},
		methods: {
			formSubmitGender(){
				uni.request({
					url:common.serverUrl + '/user/modifyUserinfo?qq=806212833',
					data:{
						userId :this.globalUser.id,
						sex:this.currentGender==='男'?1:0
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
			},
			checkBoxChange(e){
			this.currentGender = e.detail.value;
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
