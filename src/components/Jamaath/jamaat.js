import React, { useState, useEffect } from "react";
import { MainDiv, SubDiv, PrayerName, JamaatTime } from "./jamaat.styled";
import axios from "axios";
import { isEmpty } from "lodash";

import { baseUrl } from "../../constants/constants";

function Jamaat() {
	const [today, setDate] = useState(new Date());

	const [nextPrayer, setNextPrayer] = useState([]);
    const [prayerTime, setPrayerTime] = useState([]);
    const [jamaatTime, setJamaatTime]=useState([]);
	useEffect(() => {
		const timer = setInterval(() => {
			setDate(new Date());
			axios
				.get(baseUrl + "/findAdhanByDate?adhanDate=today")

				.then((response) => {
                    setNextPrayer(response.data.adhanTimes);
                    
					setPrayerTime(response.data.adhanTime);
				});
		}, 1000);

		const todaysPrayers = setInterval(() => {
			setDate(new Date());
			axios
				.get(baseUrl + "/findAdhanByDate?adhanDate=")

				.then((response) => {
					setNextPrayer(response.data.prayerName);
					setPrayerTime(response.data.adhanTime);
				});
		}, 1000 * 60);

		return () => {
			clearInterval(timer);
		};
	}, []);
	return (
		<MainDiv>
			{!isEmpty(nextPrayer) ? (
				nextPrayer.map((item, index) => (
					<SubDiv>
						<PrayerName>
							<h3 style={{ color: "#fff" }}>{item.prayerName}</h3>
						</PrayerName>
						<JamaatTime>
							<h4>Prayer:{item.adhanTime}</h4>
							<h4>Jamaat:{item.jamatTime}</h4>
						</JamaatTime>
					</SubDiv>
				))
			) : (
				<p>No result</p>
			)}

			{/* <SubDiv>
				<PrayerName>
					<h3 style={{ color: "#fff" }}>Dhuhar</h3>
				</PrayerName>
				<JamaatTime>
					<h4>Prayer:4:35</h4>
					<h4>Jamaat:4:55</h4>
				</JamaatTime>
			</SubDiv>
			<SubDiv>
				<PrayerName>
					<h3 style={{ color: "#fff" }}>Asr</h3>
				</PrayerName>
				<JamaatTime>
					<h4>Prayer:4:35</h4>
					<h4>Jamaat:4:55</h4>
				</JamaatTime>
			</SubDiv>
			<SubDiv>
				<PrayerName>
					<h3 style={{ color: "#fff" }}>Magrib</h3>
				</PrayerName>
				<JamaatTime>
					<h4>Prayer:4:35</h4>
					<h4>Jamaat:4:55</h4>
				</JamaatTime>
			</SubDiv>
			<SubDiv>
				<PrayerName>
					<h3 style={{ color: "#fff" }}>Ishaa</h3>
				</PrayerName>
				<JamaatTime>
					<h4>Prayer:4:35</h4>
					<h4>Jamaat:4:55</h4>
				</JamaatTime>
			</SubDiv> */}
		</MainDiv>
	);
}

export default Jamaat;
