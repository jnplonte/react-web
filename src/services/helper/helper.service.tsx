import {
    toJson, toString, isNotEmpty, getCookie, setCookie, deleteCookie, isEmptyObject
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

    isEmptyObject(v: any = null): boolean {
        return isEmptyObject(v);
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

    removeNullObject(obj: object = {}): object {
        for (const propName in obj) {
            if (obj[propName] === null || obj[propName] === undefined) {
                delete obj[propName];
            }
        }

        return obj || {};
    }

    hasFormError(formState: any, field: string = '', showError: boolean = false): any {
        if (showError) {
            if (formState && formState.touched[field] && formState.errors[field]) {
                return formState.errors[field][0] || null;
            } else {
                return null;
            }
        } else {
            return formState && formState.touched[field] && formState.errors[field] ? true : false;
        }
    }

    initFormState(formState: any, target: object = {}): any {
        return {
            ...formState,
            values: {
                ...formState['values'],
                [target['name']]: target['type'] === 'checkbox' ? target['checked'] : target['value'],
            },
            touched: {
                ...formState.touched,
                [target['name']]: true,
            },
        };
    }
}
