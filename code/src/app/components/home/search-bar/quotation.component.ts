import {Component, Injectable, EventEmitter, OnInit} from "@angular/core";

@Injectable()
export class QuotationService {

  event: EventEmitter<string> = new EventEmitter();

  setQuotation(quotation: string) {
    this.event.emit(quotation);
  }

}

@Component({
  selector: 'pec-quotation',
  template: '<h2>{{quotation}}</h2>'
})
export class QuotationComponent implements OnInit {

  quotation: string;

  constructor(private _quotationService: QuotationService) {
  }

  ngOnInit() {
    this._quotationService.event
      .subscribe(quotation => this.quotation = quotation);
  }

}


