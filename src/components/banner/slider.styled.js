import styled from "styled-components";

export const Container = styled.div`
	display: flex;
	margin: auto 0;
	padding: 0 20px;
`;
export const Sliderdiv = styled.div`
	width: 65%;
	object-fit: cover;
	justify-content: center;
	background-color: red;
`;
export const BannerImage = styled.img`
	object-fit: cover;
	cursor: pointer;
	width: 100%;
`;
export const PrayerTimeDiv = styled.div`
	width: 35%;
	margin: 0 5px;
	background-color: #ff5733;
	flex-direction: row;
`;

export const CurrentTimeDiv = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	text-align: center;
	margin: auto;
`;
export const NextPrayerDiv = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: column;
`;
export const TimeHeader = styled.h1`
	font-size: 5vw;
	justify-content: center;
	text-align: center;
`;
export const PrayerName = styled.h5`
	font-size: 5vw;
	justify-content: center;
	text-align: center;

	color: #fff;
`;
export const PrayerTime = styled.h3`
	font-size: 8vw;
	color: #fff;
	justify-content: center;
	text-align: center;
`;
export const CurrentTimeHeader = styled.h5`
	font-size: 2vw;
	color: yellow;
	justify-content: center;
	text-align: center;
`;
export const MessageDiv = styled.div`
	display: flex;
	padding: 5px;
	font-size: 2vw;
	font-weight: 700;
	text-color: red;
	overflow-x: scroll;
	white-space: nowrap; // text will move in single line

	p {
		-moz-animation: marquee 20s linear infinite;
		-webkit-animation: marquee 20s linear infinite;
		animation: marquee 20s linear infinite;
	}
	@-moz-keyframes marquee {
		0% {
			transform: translateX(10%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	@-webkit-keyframes marquee {
		0% {
			transform: translateX(100%);
		}
		100% {
			transform: translateX(-100%);
		}
	}
	@keyframes marquee {
		0% {
			-moz-transform: translateX(100%);
			-webkit-transform: translateX(100%);
			transform: translateX(100%);
		}
		100% {
			-moz-transform: translateX(-100%);
			-webkit-transform: translateX(-100%);
			transform: translateX(-100%);
		}
	}
`;
