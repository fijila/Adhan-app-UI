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
	const handleOk = (e) => {
		console.log(e);
		setShow(false);
	};

	const handleCancel = (e) => {
		console.log(e);
		setShow(false);
	};
	const onDateChange = (date, dateString) => {
		// console.log("date is", dateString);
		userInput["date"] = dateString;

		console.log("date is", userInput);
	};

	const handleTimePickerChange = (time, timeString, namaz) => {
		userInput[namaz] = timeString;
		console.log("time is", userInput);
	};
    

	

		


	const handleSubmit = () => {
		setShow(false);
		userDataArr.date = userInput.date;
		var adhanJson = {};
		adhanJson.adhanDate = userDataArr.date;
		var prayerArr = [];
		var adhanFajr = {};
		var adhanDhuhar = {};
		var adhanAsar = {};
		var adhanMagrib = {};
		var adhanIshaa = {};
		adhanFajr.prayerName = "Fajr";
		adhanFajr.adhanTime = userInput.Fajr;
		prayerArr.push(adhanFajr);
		adhanJson.adhanTimes = prayerArr;
		JSON.stringify(adhanJson);
		adhanDhuhar.prayerName = "Dhuhar";
		adhanDhuhar.adhanTime = userInput.Dhuhar;
		prayerArr.push(adhanDhuhar);
		adhanJson.adhanTimes = prayerArr;
		JSON.stringify(adhanJson);
		adhanAsar.prayerName = "Asar";
		adhanAsar.adhanTime = userInput.Asar;
		prayerArr.push(adhanAsar);
		adhanJson.adhanTimes = prayerArr;
		JSON.stringify(adhanJson);
		adhanMagrib.prayerName = "Magrib";
		adhanMagrib.adhanTime = userInput.Magrib;
		prayerArr.push(adhanMagrib);
		adhanJson.adhanTimes = prayerArr;
		JSON.stringify(adhanJson);
		adhanIshaa.prayerName = "Ishaa";
		adhanIshaa.adhanTime = userInput.Ishaa;
		prayerArr.push(adhanIshaa);

		adhanJson.adhanTimes = prayerArr;
		console.log("result is", JSON.stringify(adhanJson));

		axios.post("http://localhost:8080/adhan", adhanJson)
		.then((response) => console.log("response is", response.data));

		console.log(JSON.stringify(userDataArr));
		setUserDataArr(userDataArr);

		setCount(userDataArr.length);
	};
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
		console.log("dgsgdhsghsgd");
		fetchData();
	}, [userDataArr]);
	useEffect(() => {
		console.log("dgsgdhsghsgd");
		fetchData();
	}, []);

	return (
		<div>
			<Button type="primary" onClick={showModal}>
				Add Prayer
			</Button>
			<Modal title="Basic Modal" visible={show} onOk={handleSubmit} onCancel={handleCancel}>
				<div>
					<Form>
						<Space direction="vertical">
							<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
								<DatePicker value={editObj.date} onChange={onDateChange} />
							</Form.Item>
						</Space>
						<Mode>
							<Space direction="vertical">
								Fajr
								<Form.Item rules={[{ required: true, message: "Please input your username!" }]}>
									<TimePicker
										value={editObj.Fajr}
										onChange={(time, timeString) => handleTimePickerChange(time, timeString, "Fajr")}
									/>
								</Form.Item>
								Dhuhar
								<Form.Item rules={[{ type: "object", required: true, message: "Please input your username!" }]}>
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
