import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-auth-layout',
  standalone: false,
  templateUrl: './auth-layout.component.html',
  styles: ``,
})
export class AuthLayoutComponent implements OnInit {
  ngOnInit() {
    customInitFunctions();
  }
}
