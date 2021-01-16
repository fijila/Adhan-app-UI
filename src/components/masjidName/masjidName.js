import React, { useState } from "react";
import { Modal, Button, Form, Input} from "antd";
import axios from "axios";
import { baseUrl } from "../../constants/constants";
import { Inputfield } from "./masjidName.styled";

function MasjidName() {
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};
	const [state, setState] = useState(false);
	const [name, setName] = useState([]);

	const showModal = () => {
		setState(true);
	};

	const handleOk = (e) => {
		var msgReq = {};
		if (name == null || name == undefined || name == "") {
			alert("Please enter valid Message!");
		}

        msgReq.name =name;
        console.log("Request body" + JSON.stringify(msgReq));
		axios.post(baseUrl + "/masjidname", msgReq).then((response) => console.log("response is", response.data));
		setState(false);
	};

	const handleCancel = () => {
		setState(false);
	};
	const onNameChange = (event) => {
		console.log(event.target.value);
		setName(event.target.value);
	};
	return (
		<div>
			<>
				<Button type="primary" onClick={showModal} style={{ margin: "auto 5px" }}>
					Edit Name
				</Button>
				<Modal title="Masjid Name" visible={state} onOk={handleOk} onCancel={handleCancel}>
					<label>
						<Inputfield type="text" value={name} onChange={onNameChange} />
					</label>
				</Modal>
			</>
		</div>
	);
}

export default MasjidName

