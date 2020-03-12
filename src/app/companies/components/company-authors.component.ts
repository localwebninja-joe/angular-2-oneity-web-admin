import { Component, Input } from '@angular/core';

import { Company } from '@app/companies/models';

@Component({
  selector: 'bc-company-authors',
  template: `
    <h5 mat-subheader>Written By:</h5>
    <span>
      {{ authors | bcAddCommas }}
    </span>
  `,
  styles: [
    `
      h5 {
        margin-bottom: 5px;
      }
    `,
  ],
})
export class CompanyAuthorsComponent {
  @Input() company: Company;

  get authors() {
    return this.company.companyInfo.name;
  }
}
