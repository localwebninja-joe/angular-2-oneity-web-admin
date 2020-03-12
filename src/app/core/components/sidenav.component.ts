import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'bc-sidenav',
  template: `
    <mat-sidenav #sidenav [opened]="open" (keydown.escape)="sidenav.close()" (closedStart)="closeMenu.emit()" disableClose>
      <mat-nav-list>
        <ng-content></ng-content>
      </mat-nav-list>
    </mat-sidenav>
  `,
  styles: [
    `
      mat-sidenav {
        width: 300px;
        color: #96abbb;
      }
      .mat-list-option:hover, 
      .mat-list-option:focus, 
      .mat-nav-list .mat-list-item:hover, 
      .mat-nav-list .mat-list-item:focus, 
      .mat-action-list .mat-list-item:hover, 
      .mat-action-list 
      .mat-list-item:focus {
        background-color: #e7f3ff !important;
        color: #188bf6 !important;
      }
    `,
  ],
})
export class SidenavComponent {
  @Input() open = false;
  @Output() closeMenu = new EventEmitter();
}
