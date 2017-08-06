import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions} from "@angular/http";
import {CONFIG} from "../app.config";
import {Contact} from "../interfaces/contact.interface";

@Injectable()
export class ContactService {

  constructor(private _http: Http) {
  }

  sendMessage(contact: Contact) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this._http.post(`${CONFIG.apiRoot}/contact`, contact, options)
      .map(res => res.json());
  }

}
