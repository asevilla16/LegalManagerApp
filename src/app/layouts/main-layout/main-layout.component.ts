import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
})
export class MainLayoutComponent implements OnInit {
  ngOnInit() {
    customInitFunctions();
  }
}
