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
		`;
export const NextPrayerDiv = styled.div`
	padding: 5px;
	display: flex;
	flex-direction: column;
`;
export const TimeHeader = styled.h1`
	font-size: 5vw;
`;
export const PrayerName = styled.h5`
			font-size: 3vw;
			color: #fff;
		`;
export const PrayerTime = styled.h3`
    font-size: 5vw;
    color:#fff;
`;
export const CurrentTimeHeader = styled.h5`
			font-size: 2vw;
			color:yellow;
		`;
