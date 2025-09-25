import { Component, OnInit } from '@angular/core';

declare function customInitFunctions(): void;

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
  ngOnInit() {
    customInitFunctions();
  }
}
