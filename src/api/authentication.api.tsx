import { Request } from '../services/request/request.service';

interface IRequestProps {
	status: string;
	message: string;
	data?: object | Array<any | null> | null;
}

export class AuthAPI {
	protected request: Request;

	constructor() {
		this.request = new Request();
	}

	login(params: object = {}, data: object = {}) {
		return this.request
			.post('REACT_APP_API', 'v1/auth/login', params, data)
			.then((request: IRequestProps) => {
				if (request.status && request.status === 'success') {
					const requestData: any = { type: 'success', message: 'success.login' };
					if (request.data) {
						requestData['data'] = request.data;
					}

					return requestData;
				} else {
					return { type: 'error', message: 'error.login' };
				}
			})
			.catch((error: any) => ({ type: 'error', message: 'error.login' }));
	}
}
