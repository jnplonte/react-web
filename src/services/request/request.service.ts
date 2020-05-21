import axios from 'axios';
import { Logger } from './../logger/logger.service';
import { Helper } from './../helper/helper.service';

const handleResponse = (response: any) => {
  const status: boolean = response.status === 200 && (response.data && (response.data.status === 200 || response.data.status === 'success'));

  return status ? response.data : {
      status: 'failed',
      message: (response.data && response.data.message) ? response.data.message : 'server-error',
      data: (response.data && response.data.data) ? response.data.data : {},
    };
};

const handleError = (error: any, type?: string) => {
  return type === 'GET' ? null : {
      status: 'failed', message: error,
    };
};

export class Request {
  logger: Logger;
  helper: Helper;
  service: any;

  customerKey: string = '';
  customerHash: string = '';

  constructor(hasAuth: boolean = false, auth?: string) {
    this.logger = new Logger();
    this.helper = new Helper();

    this.customerKey = process.env.REACT_APP_CUSTOMER_KEY || '';
    this.customerHash = process.env.REACT_APP_CUSTOMER_KEY_HASH || '';

    const additionalHeaders: object = {
      'Content': 'application/json',
      'Content-Type': 'application/json',
      [this.customerKey]: Buffer.from(this.customerHash).toString('base64'),
    };

    if (hasAuth) {
      additionalHeaders['Authorization'] = `Bearer ${auth}`;
    }

    this.service = axios.create({
      headers: additionalHeaders,
    });
  }

  get(name: string = 'REACT_APP_API', path: string = '', params: object = {}, isFullPath: boolean = false) {
    const url: string = process.env[name.toUpperCase()] || '';
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    params = this.helper.removeNullObject(params);
    return this.service.get(fullPath, {params}, {crossDomain : true})
      .then((response: any) => handleResponse(response))
      .catch((error: any) => {
        this.logger.error('GET', error);
        return handleError(error, 'GET');
      });
  }

  getAll(paths: string[] = [], params: Array<object | null> = []) {
    const promises: Array<Promise<any> | null> = [];

    paths.forEach((dataVal, dataIndx) => {
      const nParams: object = this.helper.removeNullObject(params[dataIndx] || {});
      promises.push(this.get('', dataVal || '', nParams, true));
    });

    return Promise.all(promises)
      .then((results: any) => {
        return results;
      })
      .catch((error: any) => {
        this.logger.error('GET', error);
        handleError(error, 'GET');
      });
  }

  post(name: string = 'REACT_APP_API', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url: string = process.env[name.toUpperCase()] || '';
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    params = this.helper.removeNullObject(params);
    return this.service.request({
        method: 'POST',
        url: fullPath,
        params,
        data,
      }, {crossDomain : true})
      .then((response: any) => handleResponse(response))
      .catch((error: any) => {
        this.logger.error('POST', error);
        return handleError(error, 'POST');
      });
  }

  put(name: string = 'core', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url: string = process.env[name.toUpperCase()] || '';
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    params = this.helper.removeNullObject(params);
    return this.service.request({
        method: 'PUT',
        url: fullPath,
        params,
        data,
      })
      .then((response: any) => handleResponse(response))
      .catch((error: any) => {
        this.logger.error('PUT', error);
        return handleError(error, 'PUT');
      });
  }

  delete(name: string = 'core', path: string = '', params: object = {}, data: any = {}, isFullPath: boolean = false) {
    const url: string = process.env[name.toUpperCase()] || '';
    const fullPath: string = (isFullPath) ? path : (this.helper.isNotEmpty(path)) ? `${url}/${path}` : url;

    params = this.helper.removeNullObject(params);
    return this.service
      .request({
        method: 'DELETE',
        url: fullPath,
        params,
        data,
      })
      .then((response: any) => handleResponse(response))
      .catch((error: any) => {
        this.logger.error('DELETE', error);
        return handleError(error, 'DELETE');
      });
  }
}
