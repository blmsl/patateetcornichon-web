import {Component, OnInit, Input, OnChanges, Output, EventEmitter} from '@angular/core';
import {Category} from "../../../../interfaces/category.interface";
import {NavAnimations} from "./nav.animations";
import {MdDialog, MdDialogConfig} from "@angular/material";
import {SoonComponent} from "../../../extra/soon/soon.component";

@Component({
  selector: 'pec-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  animations: NavAnimations
})
export class NavComponent implements OnInit {
  @Input() categories: Category[];
  @Input() viewport: string;
  @Input() socialUrls: Object;
  @Input() navState: string;
  @Input() defaultLogo: string;

  @Output() changeNavState: EventEmitter<any> = new EventEmitter();

  constructor(private _dialog: MdDialog) { }

  ngOnInit() {
  }

  openDialog() {
    this._dialog.open(SoonComponent);
  }


}
