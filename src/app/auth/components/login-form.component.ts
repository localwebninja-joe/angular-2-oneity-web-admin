import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Credentials } from '@app/auth/models';
import { faFacebookF, faTwitter, faLinkedinIn, faInstagram, faGooglePlusG  } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'bc-login-form',
  templateUrl: 'login-form.component.html',
  styleUrls: ['login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  socialMediaButtons= {
    facebook: faFacebookF,
    twitter: faTwitter,
    linkedin: faLinkedinIn,
    instagram: faInstagram,
    googlePlus: faGooglePlusG,
  };
  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  @Input() errorMessage: string | null;

  @Output() submitted = new EventEmitter<Credentials>();
  @Output() socialSubmitted = new EventEmitter<string>();

  form: FormGroup = new FormGroup({
    username: new FormControl('ido.adler@gmail.com'),
    password: new FormControl('J37ido9BDj9adlerg7NasWgaqourAr'),
  });
  provider : string;
  constructor() {}

  ngOnInit() {}

  submit() {
    if (this.form.valid) {
      this.submitted.emit(this.form.value);
    }
  }
  socialSubmit(provider: string){

    this.socialSubmitted.emit(provider);
  }

}
