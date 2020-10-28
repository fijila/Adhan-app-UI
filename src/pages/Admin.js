import React, { useState, useReducer, useEffect } from "react";
import { DatePicker, Space, TimePicker, Modal, Button, Form, Table, Popconfirm } from "antd";
import "antd/dist/antd.css";
import { Mode } from "./Admin.styled";
import axios from "axios";
import moment from "moment";


function Timesetting() {
	const [type, setType] = useState([]);
	const columns = [
		{
			title: "Date",
			dataIndex: "adhanDate",
			key: "adhanDate",
			defaultSortOrder: "descend",
			sorter: (a, b) => new Date(a.adhanDate) - new Date(b.adhanDate),
		},
		{
			title: "Fajr",
			dataIndex: "Fajr",
			key: "Fajr",
		},
		{
			title: "Dhuhar",
			dataIndex: "Dhuhar",
			key: "Dhuhar",
		},
		{
			title: "Asar",
			dataIndex: "Asar",
			key: "Asar",
		},
		{
			title: "Magrib",
			dataIndex: "Magrib",
			key: "Magrib",
		},
		{
			title: "Ishaa",
			dataIndex: "Ishaa",
			key: "Ishaa",
		},
		{
			title: "operation",
			dataIndex: "operation",
			render: (text, record) =>
				type.length >= 1 ? (
					<Popconfirm title="Sure to Edit?" onConfirm={() => handleEdit(record.adhanDate)}>
						<a>Edit</a>
					</Popconfirm>
				) : null,
		},
	];

	const [show, setShow] = useState(false);
	const [userInput, setUserInput] = useReducer((state, newState) => ({ ...state, ...newState }), {
		date: "",
	});

	const [editObj, setEditObj] = useReducer((state, newState) => ({ ...state, ...newState }), {
		
	});
	// const [userInput,setUserInput] = useState([]);

	const [userDataArr, setUserDataArr] = useReducer((state, newState) => ({ ...state, ...newState }), {
		date: "",
		adhanTime: [],
	});
	const [adhanTimeObject, setadhanTimeObject] = useState({});

	const [count, setCount] = useState();
	const showModal = () => {
		setShow(true);
	};


	const handleCancel = (e) => {
		console.log(e);
		setShow(false);
	};
	const onDateChange = (date, dateString) => {
		// console.log("date is", dateString);
		userInput["date"] = dateString;
		editObj.date = moment(dateString);
		

		console.log("date is", userInput);
	};

	const handleTimePickerChange = (time, timeString, namaz) => {
		if (timeString == null || timeString == "") {
			alert("invalid time");
			return;
		}
		userInput[namaz] = timeString;
		editObj[namaz] = moment(timeString, "HH:mm:ss");
		setUserInput(userInput);
		console.log("time is", userInput);
	};
    

	

		


	const handleSubmit = () => {
		if (
			!(validateUserField(userInput["date"]) &&
			validateUserField(userInput["Fajr"]) &&
			validateUserField(userInput["Dhuhar"]) &&
			validateUserField(userInput["Asar"]) &&
			validateUserField(userInput["Magrib"]) &&
			validateUserField(userInput["Ishaa"]))
		) {
			alert("Validation Failure");
			return;
		}
		userDataArr.date = userInput.date;
		var adhanJson = {};
		adhanJson.adhanDate = userDataArr.date;
		var prayerArr = [];
		prayerArr.push(generateAdhanInputObject(userInput, "Fajr"));
		prayerArr.push(generateAdhanInputObject(userInput, "Dhuhar"));
		prayerArr.push(generateAdhanInputObject(userInput, "Asar"));
		prayerArr.push(generateAdhanInputObject(userInput, "Magrib"));
		prayerArr.push(generateAdhanInputObject(userInput, "Ishaa"));
		adhanJson.adhanTimes = prayerArr;
		console.log("result is", JSON.stringify(adhanJson));
		setShow(false);
		axios.post("http://localhost:8080/adhan", adhanJson)
		.then((response) => console.log("response is", response.data));

		console.log(JSON.stringify(userDataArr));
		setUserDataArr(userDataArr);

		setCount(userDataArr.length);
	};

	
	function validateUserField(val){
		if (val == null || val == "") {
			return false;
		}
		return true;

	}
	function generateAdhanInputObject(userInput,adhanName) {
		var adhanObj = {};
		adhanObj.prayerName = adhanName;
		adhanObj.adhanTime = userInput[adhanName];
		return adhanObj;
	}
	async function fetchData() {
		const response = await axios(`http://localhost:8080/adhan`);
		const datas = await response.data;
		var outData = datas.adhanModels.map(iterateAdhan);
		setType(outData);
		console.log(type);
	}

	function iterateAdhan(value, index, array) {
		return convertresponseToAdhanObject(value);
	}
	function convertresponseToAdhanObject(value){
		let adhanObj = {};
		adhanObj.adhanDate = value.adhanDate;
		adhanObj.Fajr = getPrayerTimeByPrayer(value.adhanTimes, "Fajr");
		adhanObj.Dhuhar = getPrayerTimeByPrayer(value.adhanTimes, "Dhuhar");
		adhanObj.Asar = getPrayerTimeByPrayer(value.adhanTimes, "Asar");
		adhanObj.Magrib = getPrayerTimeByPrayer(value.adhanTimes, "Magrib");
		adhanObj.Ishaa = getPrayerTimeByPrayer(value.adhanTimes, "Ishaa");
		return adhanObj;
	}
	function addPrayer(){
		showModal();
	}
	const handleEdit = (key) => {
		console.log(key);
		
		axios.get("http://localhost:8080/findAdhanByDate?adhanDate="+key).then((response) => {
			console.log("response is", response.data)
			let adhanObj=convertresponseToAdhanObject(response.data);
			editObj.date = moment(adhanObj.adhanDate);
			editObj.Fajr = moment(adhanObj.Fajr, "HH:mm:ss");
			editObj.Dhuhar = moment(adhanObj.Dhuhar, "HH:mm:ss");
			editObj.Asar = moment(adhanObj.Asar, "HH:mm:ss");
			editObj.Magrib = moment(adhanObj.Magrib, "HH:mm:ss");
			editObj.Ishaa = moment(adhanObj.Ishaa, "HH:mm:ss");

			userInput.date = adhanObj.adhanDate;
			userInput.Fajr = adhanObj.Fajr;
			userInput.Dhuhar = adhanObj.Dhuhar;
			userInput.Asar = adhanObj.Asar;
			userInput.Magrib = adhanObj.Magrib;
			userInput.Ishaa = adhanObj.Ishaa;

			showModal();
		});
	};
	function getPrayerTimeByPrayer(valArray, prayerName) {
		console.log("Val Array" + valArray);
		console.log("prayerName" + prayerName);
		var returnObj = valArray.filter((obj) => {
			return obj.prayerName === prayerName;
		});
		return returnObj[0].adhanTime;
	}
	useEffect(() => {
		console.log("userInput Updated");
	},[userInput]);
	useEffect(() => {
		console.log("User Data Array updated");
		fetchData();
	}, [userDataArr]);
	useEffect(() => {
		console.log("Initial Load");
		fetchData();
	}, []);

	return (
		<div>
			<Button type="primary" onClick={addPrayer}>
				Add Prayer
			</Button>
			<Modal title="Basic Modal" visible={show} onOk={handleSubmit} onCancel={handleCancel} style={{ width: "800px" }}>
				<div>
					<Form>
						<Space direction="vertical">
							<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
								<DatePicker value={editObj.date} onChange={onDateChange} />
							</Form.Item>
						</Space>
						<Mode>
							<Space>
								<div style={{ width: "200px", padding: "20px" }}>
									Fajr
									<Form.Item>
										<TimePicker
											value={editObj.Fajr}
											onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Fajr")}
										/>
									</Form.Item>
									Dhuhar
									<Form.Item rules={[{ type: "object", required: true, message: "Please input Time!" }]}>
										<TimePicker
											value={editObj.Dhuhar}
											onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Dhuhar")}
										/>
									</Form.Item>
									Asar
									<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
										<TimePicker
											value={editObj.Asar}
											onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Asar")}
										/>
									</Form.Item>
								</div>
								<div style={{ width: "200px", padding: "10px" }}>
									Magrib
									<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
										<TimePicker
											value={editObj.Magrib}
											onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Magrib")}
										/>
									</Form.Item>
									Ishaa
									<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
										<TimePicker
											value={editObj.Ishaa}
											onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Ishaa")}
										/>
									</Form.Item>
								</div>
							</Space>
						</Mode>
					</Form>
				</div>
			</Modal>
			<Table dataSource={type} columns={columns} />;
		</div>
	);
}

export default Timesetting;
