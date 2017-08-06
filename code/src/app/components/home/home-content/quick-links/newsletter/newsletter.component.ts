import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilsService} from "../../../../../services/utils.service";
import {SocialService} from "../../../../../services/social.service";
import {GlobalValidators} from "../../../../../shared/globalValidators";

@Component({
  selector: 'pec-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['../quick-links.component.scss']
})
export class NewsletterComponent implements OnInit {

  emailForm: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              private _utilsService: UtilsService,
              private _socialService: SocialService)
  { }

  ngOnInit() {
    this.buildForm();
  }

  // If the user press Enter
  onKeyboardEnter(event: KeyboardEvent) {
    if (event.key === 'Enter') this.addEmail();
  }

  // Add the email to Mailchimp list
  addEmail() {
    const email = this.emailForm.get('email');

    if (email.valid) {
      this._utilsService.snackBar('pending', 'Inscription en cours...');
      this._socialService.addToMailchimp(email.value).subscribe(
        () => {
          this._utilsService.snackBar('success', 'Bravo ! On a bien reçu ton email.');
          this.emailForm.reset();
        },
        err => {
          console.log(err)
          if (err.error.title === 'Member Exists') this._utilsService.snackBar('error', 'Tu es déjà inscrit(e) !');
          else this._utilsService.snackBar('error', 'Une erreur est survenue.')
        }
      )
    } else {
      this._utilsService.snackBar('error', 'L\'email n\'est pas valide.');
    }
  }

  // Email form
  buildForm(): void {
    this.emailForm = this._formBuilder.group({
      email: this._formBuilder.control('', [Validators.required, GlobalValidators.mailFormat])
    });
  }

}
