import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import {GlobalValidators} from "../../../../shared/globalValidators";
import {UtilsService} from "../../../../services/utils.service";
import {ContactService} from "../../../../services/contact.service";
import {Contact} from "../../../../interfaces/contact.interface";

@Component({
  selector: 'pec-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [ContactService]
})
export class ContactFormComponent implements OnInit {

  contactForm: FormGroup;
  contactDisabled: boolean = true;

  constructor(private _contactService: ContactService,
              private _utilsService: UtilsService,
              private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  /**
   * Get the contactForm with validators
   */
  buildForm(): void {
    this.contactForm = this._formBuilder.group({
      name: ['', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(24)
      ]],
      email: ['', [
        Validators.required,
        GlobalValidators.mailFormat
      ]],
      subject: ['', [
        Validators.required
      ]],
      content: ['', [
        Validators.required
      ]]
    });

    // On form changes, call to the function onValueChanged
    this.contactForm.valueChanges
      .subscribe(data => this.onValueChanged());
  }

  /**
   * When the values change, we change the formErrors state
   */
  onValueChanged() {
    if (!this.contactForm) { return; }

    const form = this.contactForm;

    for (const field in this.formErrors) {
      const control = form.get(field);
      if (control && !control.dirty) {
        this.formErrors[field] = 'default';
      } else if (control && control.dirty && !control.valid) {
        this.formErrors[field] = 'warning';
      } else if (control && control.dirty && control.valid) {
        this.formErrors[field] = 'success';
      }
    }

    this.contactDisabled = !this.contactForm.valid;
  }

  /**
   * FormErrors with strings
   */
  formErrors = {
    'name': 'default',
    'email': 'default',
    'subject': 'default',
    'content': 'default'
  };

  /**
   * Send a new message
   */
  addMessage() {
    this._utilsService.snackBar('pending', 'Envoi en cours...');

    this.contactDisabled = true;
    const formValues = this.contactForm.value;

    const contact: Contact = {
      name: formValues.name,
      email: formValues.email,
      subject: formValues.subject,
      content: formValues.content
    };

    // Call to the Contact API
    this._contactService.sendMessage(contact)
      .subscribe(
        result => {
          this._utilsService.snackBar('success', 'On a bien reçu ton message !');
          this.contactForm.reset();
        },
        err => this._utilsService.snackBar('error', 'Une erreur est survenue.')
      )
  }


}
