import {Pipe} from '@angular/core';

@Pipe({
  name: 'smiley'
})
export class SmileyPipe {

  constructor() {}

  public transform(content: string): string {
    if (!content) return null;
    const smileys = {
      ':)': this.getSmiley('happy'),
      ':-)': this.getSmiley('happy'),
      ':(': this.getSmiley('unhappy'),
      ':-(': this.getSmiley('unhappy'),
      ':-D': this.getSmiley('lol'),
      ':D': this.getSmiley('lol'),
      ';-)': this.getSmiley('wink'),
      ';)': this.getSmiley('wink'),
      '<3': this.getSmiley('love'),
    };

    return content.replace(/(\:\)|\:-\)|\:D|\:-D|\:-\(|\:\(|\;-\)|\;\)|<3)/g, (all) => {
      return smileys[all] || all;
    });
  }

  private getSmiley(smiley: string): string {
    return `<svg class="smiley"><use xlink:href="/assets/svg/smileys.svg#${smiley}"></use></svg>`
  }

}
