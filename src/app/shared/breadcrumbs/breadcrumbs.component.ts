import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter, map, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  standalone: false,
  templateUrl: './breadcrumbs.component.html',
  styleUrl: './breadcrumbs.component.css',
})
export class BreadcrumbsComponent {
  title: string = '';
  unsubscribe: Subject<void> = new Subject();

  constructor(private router: Router) {
    this.getTitle();
  }

  getTitle() {
    this.router.events
      .pipe(
        filter((e): e is ActivationEnd => e instanceof ActivationEnd),
        filter((e: ActivationEnd) => e.snapshot.firstChild == null),
        map((e: ActivationEnd) => e.snapshot.data),
        takeUntil(this.unsubscribe)
      )
      .subscribe((data) => {
        this.title = data.title;
        document.title = `AdminPro - ${this.title}`;
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
