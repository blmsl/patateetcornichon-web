import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CONFIG} from '../app.config';
import {Contact} from '../interfaces/contact.interface';

@Injectable()
export class ContactService {

  constructor(private _http: HttpClient) {
  }

  sendMessage(contact: Contact) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${CONFIG.apiRoot}/contact/`, contact, {headers});
  }

}
