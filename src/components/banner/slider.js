import React, { useState } from "react";
import { Container, Sliderdiv, BannerImage, PrayerTimeDiv, CurrentTimeDiv, NextPrayerDiv,CurrentTimeHeader, TimeHeader, PrayerName, PrayerTime } from "./slider.styled";
import Carousel from "react-bootstrap/Carousel";
import "bootstrap/dist/css/bootstrap.min.css";
import assets from "../../assets";

function Slider() {
	const [index, setIndex] = useState(0);

	const handleSelect = (selectedIndex, e) => {
		setIndex(selectedIndex);
	};
	return (
		<Container>
			<Sliderdiv>
				<Carousel activeIndex={index} onSelect={handleSelect}>
					<Carousel.Item>
						<BannerImage src={assets.images.banner} alt="" />
					</Carousel.Item>
					<Carousel.Item>
						<BannerImage src={assets.images.banner2} alt="" />
					</Carousel.Item>
					<Carousel.Item>
						<BannerImage src={assets.images.banner} alt="" />
					</Carousel.Item>
					<Carousel.Item>
						<BannerImage src={assets.images.banner2} alt="" />
					</Carousel.Item>
				</Carousel>
			</Sliderdiv>
			<PrayerTimeDiv>
				<NextPrayerDiv>
					<TimeHeader>Next prayer</TimeHeader>
					<PrayerName> 
						
						Dhuhr</PrayerName>
					<PrayerTime>1.25</PrayerTime>
				</NextPrayerDiv>
				<CurrentTimeDiv>
					<CurrentTimeHeader>Current Time: 7.35</CurrentTimeHeader>
					
				</CurrentTimeDiv>
			</PrayerTimeDiv>
		</Container>
	);
}

export default Slider;
