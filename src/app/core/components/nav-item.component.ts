import { Component, Input, Output, EventEmitter } from '@angular/core';
import { faSitemap, faList   } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'bc-nav-item',
  template: `
    <a mat-list-item [routerLink]="routerLink" (click)="navigate.emit()" class="nav-item">
      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line class="first" ><ng-content></ng-content></span>
    </a>
  `,
  styles: [
    ` 
      .nav-item {
        color: #96abbb;
      }
    `,
  ],
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() routerLink: string | any[] = '/';
  @Output() navigate = new EventEmitter();
}
