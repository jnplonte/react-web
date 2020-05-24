import { Request } from '../services/request/request.service';

interface IRequestProps {
  status: string;
  message: string;
  data?: object | Array<any | null> | null;
}

export class UserAPI {
  protected request: Request;

  constructor(tokenState: string = '') {
    this.request = new Request(true, tokenState);
  }

  myuser(params: object = {}) {
    return this.request.get('REACT_APP_API', 'v1/core/myuser', params)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          return {
            data: request.data || null,
          };
        } else {
          return null;
        }
      })
      .catch (
        (error: any) => {
          return null;
        }
      );
  }

  get(params: object = {}) {
    return this.request.get('REACT_APP_API', `v1/core/user/${params['id']}`)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          return {
            data: request.data || null,
          };
        } else {
          return null;
        }
      })
      .catch (
        (error: any) => {
          return null;
        }
      );
  }

  getAll(params: object = {}) {
    return this.request.get('REACT_APP_API', 'v1/core/users', params)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          return {
            data: request.data || [],
          };
        } else {
          return [];
        }
      })
      .catch (
        (error: any) => {
          return [];
        }
      );
  }

  post(data: object = {}) {
    return this.request.post('REACT_APP_API', 'v1/core/user', {}, data)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          const requestData: object = {type: 'success', message: 'insert success'};
          if (request.data) {
            requestData['data'] = request.data || null;
          }

          return requestData;
        } else {
          return {type: 'error', message: 'insert failed'};
        }
      })
      .catch (
        (error: any) => {
          return {type: 'error', message: 'insert failed'};
        }
      );
  }

  put(params: object = {}, data: object = {}) {
    return this.request.put('REACT_APP_API', `v1/core/user/${params['id']}`, {}, data)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          const requestData: object = {type: 'success', message: 'update success'};
          if (request.data) {
            requestData['data'] = request.data || null;
          }

          return requestData;
        } else {
          return {type: 'error', message: 'update failed'};
        }
      })
      .catch (
        (error: any) => {
          return {type: 'error', message: 'update failed'};
        }
      );
  }

  delete(params: object = {}) {
    return this.request.delete('REACT_APP_API', `v1/core/user/${params['id']}`)
      .then((request: IRequestProps) => {
        if (request.status && request.status === 'success') {
          const requestData: object = {type: 'success', message: 'delete success'};
          if (request.data) {
            requestData['data'] = request.data || null;
          }

          return requestData;
        } else {
          return {type: 'error', message: 'delete failed'};
        }
      })
      .catch (
        (error: any) => {
          return {type: 'error', message: 'delete failed'};
        }
      );
  }
}
