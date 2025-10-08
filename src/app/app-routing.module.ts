import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: '',
    canActivate: [authGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./modules/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'clients',
        loadChildren: () =>
          import('./modules/clients/clients.module').then(
            (m) => m.ClientsModule
          ),
      },
      {
        path: 'cases',
        loadChildren: () =>
          import('./modules/cases/cases.module').then((m) => m.CasesModule),
      },
      {
        path: 'calendar',
        loadChildren: () =>
          import('./modules/calendar/calendar.module').then(
            (m) => m.CalendarModule
          ),
      },
      {
        path: 'documents',
        loadChildren: () =>
          import('./modules/documents/documents.module').then(
            (m) => m.DocumentsModule
          ),
      },
      {
        path: 'maintenance',
        loadChildren: () =>
          import('./modules/maintenance/maintenance.module').then(
            (m) => m.MaintenanceModule
          ),
        canActivate: [adminGuard],
      },
      {
        path: 'pricing',
        loadChildren: () =>
          import('./modules/pricing/pricing.module').then(
            (m) => m.PricingModule
          ),
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./modules/profile/profile.module').then(
            (m) => m.ProfileModule
          ),
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
