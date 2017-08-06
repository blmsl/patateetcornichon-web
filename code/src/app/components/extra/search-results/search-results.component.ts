import {
  Component, OnInit,
  OnDestroy
} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'pec-search-results',
  templateUrl: './search-results.component.html',
  styles: ['.main h1.main-title { margin-bottom: 70px}']
})
export class SearchResultsComponent implements OnInit, OnDestroy  {

  query: string;

  private getParams: Subscription;

  constructor(private _route: ActivatedRoute) { }

  ngOnInit() {
    this.getParams = this._route.params.subscribe(params => {
      this.query = params['q'];
    });
  }

  ngOnDestroy() {
    if (typeof window !== 'undefined') this.getParams.unsubscribe();
  }
}
