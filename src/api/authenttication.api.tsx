import { Request } from '../services/request/request.service';

export class AuthAPI {
  protected request: Request;

  constructor() {
    this.request = new Request();
  }

  login(params: object = {}, data: object = {}) {
    return this.request.post('REACT_APP_API', 'v1/auth/login', params, data);
  }
}
