import axios from "axios";
import { API_URL } from "config";

const debugData = data => {
	// _store.dispatch(fetchingServer(false));
	return Promise.resolve(data);
};

const debugError = er => {
	// _store.dispatch(fetchingServer(false));
	return Promise.reject(er);
};

const request = (options = {}) => {
	const axiosApi = axios.create({
		baseURL: API_URL,
		...options
	});

	// _store.dispatch(fetchingServer(true));

	return {
		get(url, data) {
			return axiosApi.get(url, data).then(debugData).catch(debugError);
		},
		post(url, data) {
			return axiosApi.post(url, data).then(debugData).catch(debugError);
		},
		put(url, data) {
			return axiosApi.put(url, data).then(debugData).catch(debugError);
		},
		delete(url) {
			return axiosApi.delete(url).then(debugData).catch(debugError);
		},
		custom(config) {
			return axios(config).then(debugData).catch(debugError);
		}
	};
};

export default request;