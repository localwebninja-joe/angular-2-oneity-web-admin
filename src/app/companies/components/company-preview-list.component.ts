import { Component, Input } from '@angular/core';

import { Company } from '@app/companies/models';

@Component({
  selector: 'bc-company-preview-list',
  template: `
    <bc-company-preview *ngFor="let company of companies" [company]="company"></bc-company-preview>
  `,
  styles: [
    `
      :host {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    `,
  ],
})
export class CompanyPreviewListComponent {
  @Input() companies: Company[];
}
