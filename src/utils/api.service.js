import axios from "axios";
export class Apiservices {
	static doGet = async (url) => {
		try {
			const resp = await axios.get(url);
			console.log(resp);

			if (resp.status === 200) {
				return resp.data;
			} else if (resp.status === "401") {
				const errorResponse = {};
				errorResponse.status_code = 401;
				errorResponse.network_error = true;
				errorResponse.status_message = "Your session has expired";
				localStorage.clear();
				window.location.href = "/#/login/Your-session-expired";
			}
		} catch (e) {
			console.log(e);
			const errorResponse = {
				network_error: true,
				status_code: 500,
				status_message: "Something went wrong in network",
			};
			throw errorResponse;
		}
	};
}

export default Apiservices;
