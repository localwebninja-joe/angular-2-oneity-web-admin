import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'bc-toolbar',
  template: `
    <mat-toolbar>
      <button mat-icon-button (click)="openMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <span>Oneity Web Admin</span>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
