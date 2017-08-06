import { Inject, Pipe } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Pipe({
  name: 'escape'
})
export class EscapePipe {

  constructor(@Inject(DOCUMENT) private document: any,
              @Inject(PLATFORM_ID) private platformId: Object) {}

  transform(value: string) : string {
    if (isPlatformBrowser(this.platformId)) {
      let tmp = this.document.createElement('div');
      tmp.innerHTML = value;
      return tmp.textContent || tmp.innerText || "";
    }
    return null;
  }
}
