import React,{useState} from "react";
import { Upload, message, Button } from "antd";
import { FileLoadDiv } from "./fileUpload.styled";
import { baseUrl } from "../../constants/constants";
import axios from "axios";

function FileUpload() {
		const [selectedFile, setSelectedFile] = useState(undefined);

	const onSubmit = (values) => {
		const formData = new FormData();
		formData.append("uploadfile", selectedFile);

		axios
			.post(baseUrl + "/uploadCSV", formData)
			.then((res) => {
				alert("File Upload success");
			})
			.catch((err) => alert("File Upload Error"));
	};
	const handleFileInput = (e) => {
		// handle validations
		console.log("input file change");
		setSelectedFile(e.target.files[0]);
	};
	return (
		<FileLoadDiv>
			<input type="file" onChange={handleFileInput} accept=".csv"/>
			<Button type="primary" onClick={onSubmit}>
				Upload Adhan
			</Button>
		</FileLoadDiv>
	);
}

export default FileUpload;
