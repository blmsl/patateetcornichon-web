import { Component, OnInit } from '@angular/core';
import {MdDialog} from "@angular/material";
import {SoonComponent} from "../../../extra/soon/soon.component";
import { SocialService } from '../../../../services/social.service';

@Component({
  selector: 'pec-quick-links',
  templateUrl: './quick-links.component.html',
  styleUrls: ['./quick-links.component.scss']
})
export class QuickLinksComponent implements OnInit {

  instagram: string;

  constructor(private _dialog: MdDialog,
              private socialService: SocialService) {
  }

  ngOnInit() {
    this.instagram = this.socialService.getSocialUrls().instagram;
  }

  openDialog() {
    this._dialog.open(SoonComponent);
  }

}
