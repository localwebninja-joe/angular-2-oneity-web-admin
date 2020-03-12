import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Credentials, Register } from '@app/auth/models';
import { userRegistrationFields, Languages,Countries } from '@app/core/models';
@Component({
  selector: 'bc-register-form',
  templateUrl: 'register-form.component.html',
  styleUrls: ['register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  basic: FormGroup;
  individual: FormGroup;

  visible = true;
  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  languageCtrl = new FormControl();
  filteredLanguages: Observable<string[]>;
  languages1: string[] = ['English'];
  allLanguages: string[] = ['English', 'Spanish', 'Portugues', 'Arabian', 'Armenian'];
  minDate: Date;
  maxDate: Date;
  @ViewChild('languageInput' , { static: true }) languageInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: true }) matAutocomplete: MatAutocomplete;

  @Input()
  set pending(isPending: boolean) {
    if (isPending) {
      this.basic.disable();
    } else {
      this.basic.enable();
    }
  }

  @Input() errorMessage: string | null;
  @Input() userRegistrationFields: userRegistrationFields;
  @Input() languages: Languages;
  @Input() countries: Countries;
  @Output() submitted = new EventEmitter<Register>();


  constructor(private _formBuilder: FormBuilder) {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 80, 0, 1);
    this.maxDate = new Date(currentYear - 13, 11, 31);
    // this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((language: string | null) => 
    //     language ? this._filter(language) : this.allLanguages.slice()
    //   )
    // );
    this.filteredLanguages = this.languageCtrl.valueChanges.pipe(
      startWith(null),
      map((language: string | null) => 
        language ? this._filter(language) : this.allLanguages.slice()
      )
    );
  }

  ngOnInit() {
    this.basic = this._formBuilder.group({
      // languagesCtrl: ['', Validators.required],
      firstname: ['Erick', Validators.required],
      lastname: ['Gaillard', Validators.required],
      middlename: ['Fernando'],
      gender: ['Male', Validators.required],
      marital_status: ['married', Validators.required],
      dob: [new Date('7/31/1986'), Validators.required],
      username: ['sicumerick', Validators.required],
      email: ['sicum@hotmail.com', [Validators.required,Validators.email]],
      password: ['demo123', Validators.required],
      c_password: ['demo123', Validators.required],
      country_id: ['United States', Validators.required],
      state: ['Baja California',],
      street: ['privada de los narcisos 2247 int 32b fracc Lomas Terrabella', Validators.required],
      city: ['Tijuana', Validators.required],
      postal_code: ['22203', Validators.required],
      highest_school: ['Graduate', Validators.required],
      ec_firstname: ['Brenda', Validators.required],
      ec_lastname: ['Blanco', Validators.required],
      ec_email: ['brendabgaillard@gmail.com',[Validators.required,Validators.email]],
      ec_mobile: ['', Validators.required],
      school_name: ['Univer', Validators.required],
      start_year: ['2000', Validators.required],
      end_year: ['2003', Validators.required],
      mobile: ['', Validators.required],
    });
    this.individual = this._formBuilder.group({
      promotion_id: ['', Validators.required],
      i_have_company: ['', Validators.required],
    });

  }

  submit() {
    if (this.basic.valid && this.individual.valid) {
      const regExPattern = new RegExp(/^\d{2,4}\-\d{1,2}\-\d{1,2}$/);
      
      let result = this.basic.value;
      const val = result.dob;
      if(!regExPattern.test(val) && val != ''){
        const dob = new Date(this.basic.value.dob);
        const year = dob.getFullYear();
        let month = '' + (dob.getMonth()+1);
        let day = '' + dob.getDate();
        month = month.length < 2 ? '0' + month: month;
        day = day.length < 2 ? '0' + day: day;
        const dobFormated = [year, month, day].join('-');
        result.dob = dobFormated;
      }
      
      const test = {
        language_id :"e1b65220-46c1-11ea-87a9-6d6d899e4a97",
        mobile : '+526641799425',
        provider : "facebook",
        social_id : "2998014783553137",
        avatar:"https:\/\/graph.facebook.com\/v3.3\/2998014783553137\/picture?type=normal"
      }
    this.submitted.emit(Object.assign(result, test) );
    }
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our language
    if ((value || '').trim()) {
      this.languages1.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.languageCtrl.setValue(null);
  }

  remove(language: string): void {
    const index = this.languages1.indexOf(language);

    if (index >= 0) {
      this.languages1.splice(index, 1);
    }
  }
  selected(event: MatAutocompleteSelectedEvent): void {
    this.languages1.push(event.option.viewValue);
    this.languageInput.nativeElement.value = '';
    this.languageCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allLanguages.filter(language => language.toLowerCase().indexOf(filterValue) === 0);
  }
}
