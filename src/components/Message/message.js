import React, { useState } from "react";
import { Modal, Button, Form, Input} from "antd";
import axios from "axios";
import { baseUrl } from "../../constants/constants";
import {Textarea} from "./message.styled"


function Message() {
  const onFinish = values => {
    console.log('Received values of form: ', values);
  };
	const [state, setState] = useState(false);
	const [message, setMessage] = useState([]);

	const showModal = () => {
		setState(true);
	};

	const handleOk = (e) => {
		var msgReq={};
		if (message == null || message == undefined || message=="") {
			alert("Please enter valid Message!")
		}
		
		msgReq.message = message;
		axios.post(baseUrl + "/message", msgReq).then((response) => console.log("response is", response.data));
		setState(false);

	};

	const handleCancel = () => {
		setState(false);
	};
	const onMessageChange=(event)=>{
		console.log(event.target.value);
		setMessage(event.target.value);
	}
    return (
		<div>
			<>
				<Button type="primary" onClick={showModal} style={{ margin: "auto 5px" }}>
					Edit Message
				</Button>
				<Modal title=" Message" visible={state} onOk={handleOk} onCancel={handleCancel}>
					<label>
						<Textarea value={message} onChange={onMessageChange} />
					</label>
				</Modal>
			</>
		</div>
	);
}

export default Message;
