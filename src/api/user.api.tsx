import { Request } from '../services/request/request.service';

export class UserAPI {
  protected request: Request;

  constructor(tokenState: string = '') {
    this.request = new Request(true, tokenState);
  }

  myuser(params: object = {}, data: object = {}) {
    return this.request.get('REACT_APP_API', 'v1/core/myuser', params);
  }

  get(params: object = {}, data: object = {}) {
    return this.request.get('REACT_APP_API', `v1/core/user/${params['id']}`, {});
  }

  getAll(params: object = {}, data: object = {}) {
    return this.request.get('REACT_APP_API', 'v1/core/users', params);
  }
}
