import {FormControl} from '@angular/forms';


export class GlobalValidators {

  static mailFormat(control: FormControl): {[key: string]: any} {
    const EMAIL_REGEXP: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return !EMAIL_REGEXP.test(control.value) ? { "invalidEmail": true } : null;
  }

  static urlFormat(control: FormControl): {[key: string]: any} {
    const URL_REGEXP: RegExp = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
    return control.value && !URL_REGEXP.test(control.value) ? { "invalidUrl": true } : null;
  }
}
