import { Component, OnInit } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.css'
})
export class ContactComponent implements OnInit {

  contactForm!: FormGroup;
  contactFormSent?: boolean;
  contactFormInvalid?: boolean;

  /**
   * Initialises the form builder with the necessary validators.
   * @param {FormBuilder} formBuilder Formbuilder to be initialised
   */
  constructor(private formBuilder: FormBuilder) {
    this.contactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  // Initialises the variables to drive the checks later.
  ngOnInit(): void {
    this.contactFormSent = false;
    this.contactFormInvalid = false;
  }

  /**
   * Method that simulates the sending of information.
   * @param {Event} event Event triggered.
   * 
   */
  sendContactData(event: Event): void {
    event.preventDefault();
    //console.log(this.contactForm.value);

    // Here we check all the errors before sending the message
    if (this.hasErrors('name', 'required') || this.hasErrors('name', 'minlength')) {
      this.contactFormInvalid = true;
      this.contactFormSent = false;
      return;
    }
    if (this.hasErrors('email', 'required') || this.hasErrors('name', 'email')) {
      this.contactFormInvalid = true;
      this.contactFormSent = false;
      return;
    }
    if (this.hasErrors('message', 'required') || this.hasErrors('message', 'minlength')) {
      this.contactFormInvalid = true;
      this.contactFormSent = false;
      return;
    }

    this.contactFormSent = true;
    this.contactFormInvalid = false;
    return;
  }

  /**
   * Checks if the given field has the given error type.
   * @param {string} field Name of the field to check.
   * @param {string} errorType Error type of the field to check.
   * @returns {boolean} True if the given field has the given error type. Otherwise, False.
   */
  hasErrors(field: string, errorType: string) {
    return this.contactForm.get(field)?.hasError(errorType) && this.contactForm.get(field)?.touched;
  }
}
