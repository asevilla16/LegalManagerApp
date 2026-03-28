import { Component } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CasesService } from '../cases/services/cases.service';
import { Case } from '../cases/models/case';

@Component({
  selector: 'app-calendar',
  standalone: false,
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css',
})
export class CalendarComponent {
  cases: Case[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek,dayGridDay',
    },
    weekends: true,
    editable: true,
    selectable: true,
    eventClick: this.handleEventClick.bind(this),
    select: this.handleDateSelect.bind(this),
    events: [],
    height: 'auto',
  };

  constructor(private casesService: CasesService) {}

  ngOnInit(): void {
    this.loadCases();
  }

  loadCases(): void {
    this.casesService.getCases().subscribe({
      next: (cases: any) => {
        this.cases = cases;
        this.convertCasesToCalendarEvents();
        console.log('Cases loaded successfully:', this.cases);
      },
      error: (error) => {
        console.error('Error loading cases:', error);
      },
    });
  }

  convertCasesToCalendarEvents(): void {
    const events = this.cases.map((caseItem) => ({
      id: caseItem.id.toString(),
      title: caseItem.title,
      start: new Date(caseItem.filingDate),
      backgroundColor: this.getEventColorByStatus(caseItem.caseStatusId),
      borderColor: this.getEventColorByStatus(caseItem.caseStatusId),
      extendedProps: {
        description: caseItem.description || 'No description',
        caseNumber: caseItem.caseNumber,
        caseId: caseItem.id,
      },
    }));

    this.calendarOptions = {
      ...this.calendarOptions,
      events: events,
    };
  }

  getEventColorByStatus(caseStatusId: number): string {
    const colorMap: { [key: number]: string } = {
      1: '#007bff', // Active - Blue
      2: '#28a745', // Closed - Green
      3: '#ffc107', // Pending - Yellow
      4: '#dc3545', // Urgent - Red
    };
    return colorMap[caseStatusId] || '#007bff';
  }

  handleEventClick(clickInfo: any): void {
    const event = clickInfo.event;
    alert(
      `Case: ${event.title}\nDescription: ${event.extendedProps.description}\nDate: ${event.start.toISOString().split('T')[0]}`,
    );
  }

  handleDateSelect(selectInfo: any): void {
    const title = prompt('Enter case title:');
    if (title) {
      const calendarApi = selectInfo.view.calendar;
      calendarApi.addEvent({
        title: title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      });
    }
  }
}
