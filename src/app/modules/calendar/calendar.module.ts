import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarEventsSidebarComponent } from './components/calendar-events-sidebar/calendar-events-sidebar.component';
import { CalendarEventModalComponent } from './components/calendar-event-modal/calendar-event-modal.component';

@NgModule({
  declarations: [CalendarComponent, CalendarEventsSidebarComponent, CalendarEventModalComponent],
  imports: [CommonModule, CalendarRoutingModule, FullCalendarModule],
})
export class CalendarModule {}
