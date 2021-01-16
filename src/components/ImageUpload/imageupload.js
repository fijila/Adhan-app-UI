import React, { useState } from "react";
import { Upload, message, Modal, Button, Form, Select} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { ImageLoadDiv } from "./ImageUpload.styled";
import axios from "axios";
import { baseUrl } from "../../constants/constants";

function ImageUpload() {
	const onFinish = (values) => {
		console.log("Received values of form: ", values);
	};
	const [state, setState] = useState(false);
	const [name, setName] = useState("image1");
	const [selectedFile, setSelectedFile] = useState(undefined);

	const showModal = () => {
		setState(true);
	};

	const handleOk = (e) => {
		console.log(e);
		setState({
			visible: false,
		});
	};

	const handleCancel = () => {
		setState(false);
	};
	const onSubmit=(values)=>{
		const formData = new FormData();
		formData.append("filename", name + ".jpg");
		formData.append("uploadfile", selectedFile);

		axios
			.post(baseUrl+"/uploadImage", formData)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	}
	const onDropDownSelect=(e)=>{
		setName(e);
		console.log("value",e)

	}
	const handleFileInput = (e) => {
		// handle validations
		console.log("input file change")
		setSelectedFile(e.target.files[0]);
	};

	
	return (
		<div>
			<>
				<Button type="primary" onClick={showModal} style={{ margin: "auto 5px" }}>
					Edit Image
				</Button>
				<Modal title="Add Image" visible={state} onOk={handleCancel} onCancel={handleCancel}>
					<Form>
						<ImageLoadDiv>
							<Form.Item label="Select">
								<Select defaultValue="image1" placeholder="Select Image" onChange={onDropDownSelect}>
									<Select.Option value="image1">Image1</Select.Option>
									<Select.Option value="image2">Image2</Select.Option>
									<Select.Option value="image3">Image3</Select.Option>
									<Select.Option value="image4">Image4</Select.Option>
								</Select>
							</Form.Item>
							<Form.Item>
								<input type="file" accept=".jpg" onChange={handleFileInput} />
							</Form.Item>
							<Form.Item>
								<Button type="primary" htmlType="submit" onClick={onSubmit}>
									Submit
								</Button>
							</Form.Item>
						</ImageLoadDiv>
					</Form>
					<span style={{color:"red"}}> *The image size should be 1200*600 and in jpg format*</span>
				</Modal>
			</>
		</div>
	);
}

export default ImageUpload;
