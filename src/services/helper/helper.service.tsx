import {
    toJson, toString, isNotEmpty, getCookie, setCookie, deleteCookie,
} from 'jnpl-helper';

export class Helper {
    env: string = '';

    constructor() {
        this.env = process.env.NODE_ENV || '';
    }

    toJson(jsonData: any = ''): any {
        return toJson(jsonData);
    }

    toString(jsonData: any = ''): any {
        return toString(jsonData);
    }

    isNotEmpty(v: any = null): boolean {
        return isNotEmpty(v);
    }

    getDomain(): string {
        return (this.env === 'development') ? '' : process.env.REACT_APP_APP_DOMAIN || '';
    }

    setCookie(name: string = '', value: any = '', domain: string = '', exdays: number = 5): boolean {
        if (this.isNotEmpty(domain)) {
          domain = this.getDomain();
        }

        return setCookie(name, value, domain, exdays);
    }

    getCookie(name: string = ''): string {
        return getCookie(name);
    }

    deleteCookie(name: string = '', domain: string = ''): string {
        return deleteCookie(name, domain);
    }
}
