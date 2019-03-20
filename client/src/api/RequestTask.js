import axios from "axios";
import { API_URL } from "config";

import { Task } from 'utils';

const RequestTask = () => {
	const axiosApi = axios.create({
		baseURL: API_URL,
	});

	return {
		get(url, data, options = {}) {
			return new Task((rej, res) => {
				return axiosApi.get(url, data).then(rej).catch(res);
			})
		},
		post(url, data, options = {}) {
			return new Task((rej, res) => {
				return axiosApi.post(url, data).then(rej).catch(res);
			})
		},
		put(url, data, options = {}) {
			return new Task((rej, res) => {
				return axiosApi.put(url, data).then(rej).catch(res);
			})
		},
		delete(url, data, options = {}) {
			return new Task((rej, res) => {
				return axiosApi.delete(url, data).then(rej).catch(res);
			})
		},
		custom(config) {
			return new Task((rej, res) => {
				return axios(config).then(rej).catch(res);
			})
		}
	}
}

export default RequestTask;