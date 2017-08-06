import {Pipe} from '@angular/core';

@Pipe({
  name: 'cloudinary'
})
export class CloudinaryPipe {

  constructor() { }

  public transform(url: string, directory: string, transformation: string, format: string): string {
    if (!url || !directory || !transformation || !format) return null;
    url = `${url.substr(0, url.lastIndexOf("."))}.${format}`;
    let re = new RegExp(`upload.*\/${directory}`, 'g');
    return url.replace(re, `upload/${transformation}/${directory}`);
  }

}
