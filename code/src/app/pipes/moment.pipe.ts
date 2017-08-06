import {Pipe} from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'moment'
})
export class MomentPipe {

  constructor() {
    moment.locale('fr');
  }

  public transform(date: string, format: string): string {
    switch (format) {
      case 'short date':
        return moment(date).format('L');
      case 'full date':
        return moment(date).format('DD MMMM YYYY');
      case 'humanize':
        let dateNow = new Date();
        dateNow.setDate(dateNow.getDate() - 1);
        return new Date(date) < dateNow ? `Le ${moment(date).format('DD MMMM YYYY')}` : moment(date).fromNow();
      default:
        return null;
    }
  }

}
