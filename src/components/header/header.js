import React, { useState, useEffect } from 'react';
import { MainDiv, Heading } from "./header.styled";
import axios from "axios";
import { baseUrl } from "../../constants/constants";


function Header() {
const [name,setName]=useState([])
	useEffect(() => {
axios.get(baseUrl + "/masjidname").then((response) => {
	debugger;
	setName(response.data.name);
});

	}, []);

    return (
		<MainDiv>
			<Heading>{name}</Heading>
		</MainDiv>
	);
}

export default Header

