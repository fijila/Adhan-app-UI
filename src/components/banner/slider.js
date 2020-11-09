import React, { useState, useEffect } from "react";
import { Container, Sliderdiv,MessageDiv, BannerImage, PrayerTimeDiv, NextPrayerDiv,CurrentTimeHeader, TimeHeader, PrayerName, PrayerTime } from "./slider.styled";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import assets from "../../assets";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

function Slider() {
	const [index, setIndex] = useState(0);
	const locale = "en";
	const [today, setDate] = useState(new Date());
	const [nextPrayer,setNextPrayer]=useState([]);
	const [prayerTime,setPrayerTime]=useState([]);
	const [message, setMessage] = useState("");
	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
			axios.get(baseUrl+"/getNextPrayer")

				.then((response) => {
					setNextPrayer(response.data.prayerName);
					setPrayerTime(response.data.adhanTime);
				});
		},1000);
		axios.get(baseUrl + "/message").then((response) => {
			debugger;
			setMessage(response.data.message);
		});
		return () => clearInterval(timer);
		
	}, []);
	  const time = today.toLocaleTimeString(locale, { hour: "numeric", hour12: true, minute: "numeric" });
	
console.log("nextprayer is", nextPrayer);
	return (
		<div>
			<Container>
				<Sliderdiv>
					<Carousel activeIndex={index} onSelect={handleSelect}>
						<Carousel.Item>
							<BannerImage src={baseUrl + "/files/image1.jpg"} alt="" />
						</Carousel.Item>
						<Carousel.Item>
							<BannerImage src={baseUrl + "/files/image2.jpg"} alt="" />
						</Carousel.Item>
						<Carousel.Item>
							<BannerImage src={baseUrl + "/files/image3.jpg"} alt="" />
						</Carousel.Item>
						<Carousel.Item>
							<BannerImage src={baseUrl + "/files/image4.jpg"} alt="" />
						</Carousel.Item>
					</Carousel>
				</Sliderdiv>
				<PrayerTimeDiv>
					<NextPrayerDiv>
						<TimeHeader>Next prayer</TimeHeader>
						<PrayerName>{nextPrayer}</PrayerName>
						<PrayerTime>{prayerTime}</PrayerTime>
					</NextPrayerDiv>
					<CurrentTimeHeader>Current Time: {time}</CurrentTimeHeader>
				</PrayerTimeDiv>
			</Container>
			<MessageDiv>
				<div>
					<p style={{ color: "red", flex: 10 }}>
						{/* Do not worship except Allah and to parents do good and to relatives, orphans, and the needy. And speak to people good [words]
						and establish prayer and give zakah. */}
						{message}
					</p>
				</div>
			</MessageDiv>
		</div>
	);
}

export default Slider;
