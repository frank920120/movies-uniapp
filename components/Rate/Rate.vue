<template>
	<view class="movie-score-wrapper">
		<image src="../../static/icos/star-yellow.png" class="star-icon" v-for="(star,index) in yellowScore" ></image>
		<image src="../../static/icos/star-gray.png" class="star-icon" v-for="(star,index) in grayScore" ></image>
		<view class="movie-score" v-if="showNum == 1">9.1</view>
	</view>
</template>

<script>
export default {
	name: 'Rate',
	props: {
		innerScore: 0,
		showNum: 0
	},
	data() {
		return {
			yellowScore: 0,
			grayScore: 0
		};
	},
	created() {
		let tempScore = 0;
		if (this.innerScore != null && this.innerScore != undefined && this.innerScore != '') {
			tempScore = this.innerScore;
		}
		let yellowScore = parseInt(tempScore / 2);
		let grayScore = 5 - yellowScore;
		this.yellowScore = yellowScore;
		this.grayScore = grayScore;
	}
};
</script>

<style scoped>
.star-icon {
	width: 20upx;
	height: 20upx;
	margin-top: 6upx;
}
/* .rate{
margin-top:6upx;
} */
.movie-score {
	font-size: 12px;
	color: grey;
	margin-left: 8upx;
}
.movie-score-wrapper {
	display: flex;
}
</style>
