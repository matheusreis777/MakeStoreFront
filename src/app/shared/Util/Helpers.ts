import { HttpHeaders } from '@angular/common/http';

export class Helpers {
    static getHttpHeaders(): HttpHeaders {
        return new HttpHeaders().set('Content-Type', 'application/json').set('Authorization', 'Bearer ' + localStorage.getItem("token"));
    }

    static toJson(model: any): any {
        return JSON.stringify(model, this.removeNullValues);
    }

    private static removeNullValues(key: any, value: null) {
        if (value !== null) {
            return value;
        }
    }
}