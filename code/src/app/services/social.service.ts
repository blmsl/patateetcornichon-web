import {Observable} from 'rxjs/Observable';
import {CONFIG} from '../app.config';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Injectable} from '@angular/core';

interface Socials {
  facebook: string;
  twitter: string;
  instagram: string;
  pinterest: string;
  googleplus: string;
  youtube: string;
}

@Injectable()
export class SocialService {

  constructor(private http: HttpClient) {
  }

  public getSocialUrls(): Socials {
    return {
      facebook: 'https://www.facebook.com/patate.et.cornichon.cuisine.vegetale',
      twitter: 'https://twitter.com/PeC_cooking',
      instagram: 'https://www.instagram.com/patateetcornichon',
      pinterest: 'https://www.pinterest.com/hellopatateetco',
      googleplus: 'https://plus.google.com/+PatateetcornichonFr-cooking',
      youtube: 'https://www.youtube.com/c/PatateetcornichonFr-cooking'
    };
  }

  public getInstagramMedias(count?: number): Observable<any> {
    return this.http.get(`${CONFIG.apiRoot}/core/instagram/${count ? '?count=' + count : ''}`);
  }

  public shareOn(social: string, url: string): void {
    switch (social) {
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        url = `https://twitter.com/home?status=${url}`;
        break;
      case 'pinterest': {
        url = `https://pinterest.com/pin/create/button/?url=${url}`;
        break;
      }
      default:
        url = null
    }
    if (typeof window !== 'undefined') {
      window.open(
        url,
        '_blank',
        'height=269,width=550,resizable=1'
      );
    }
  }

  public addToMailchimp(email: string): Observable<any> {
    const subscriber = {
      email: email
    };
    return this.http.post(
      `${CONFIG.apiRoot}/core/mailchimp/`, subscriber);
  }
}
