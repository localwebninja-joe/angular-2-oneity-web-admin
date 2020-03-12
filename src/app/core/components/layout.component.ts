import { Component, EventEmitter, Input, Output } from '@angular/core';
@Component({
  selector: 'bc-layout',
  template: `
    <mat-sidenav-container (backdropClick)="navigate.emit()" >
      <mat-sidenav-content>
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      mat-sidenav-container {
        background: rgba(0, 0, 0, 0.03);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
      }

      *,
      /deep/ * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
    `,
  ],
})
export class LayoutComponent {
  @Output() navigate = new EventEmitter();
}
