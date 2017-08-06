import {Pipe} from '@angular/core';

@Pipe({
  name: 'minutesToHours'
})
export class MinutesToHoursPipe {

  constructor() {}

  public transform(times: Array<number>|number): string {
    let totalTime = 0;

    // If times value is an array, we add each time to the totalTime
    // Else, totalTime = times
    if (Array.isArray(times)) {
      for (let time of times) if (time) totalTime += Number(time);
    } else {
      totalTime = Number(times);
    }

    // If time less or equal than one hour, return time in minutes
    if (totalTime <= 60) {
      return `${totalTime} min`
    }

    // If time greater than 1 hour
    else if (totalTime > 60) {
      const hours = Math.floor(totalTime / 60);
      const minutes = ('0' + totalTime % 60).slice(-2);
      return `${hours}h${minutes}min`
    }

  }

}
