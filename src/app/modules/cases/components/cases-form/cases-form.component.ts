import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CasesService } from '../../services/cases.service';
import { Router } from '@angular/router';
import { CaseType } from '../../../maintenance/models/case-type';
import { CaseStatus } from '../../../maintenance/models/case-status';
import { CaseStatusesService } from '../../../maintenance/services/case-statuses.service';
import { CaseTypesService } from '../../../maintenance/services/case-types.service';
import { AuthService } from '../../../../core/services/auth.service';
import { User } from '../../../../core/models/user';
import { CourtTypesService } from '../../../maintenance/services/court-types.service';
import { CourtType } from '../../../maintenance/models/court-type';
import { Subject, takeUntil } from 'rxjs';
import { ClientsService } from '../../../clients/services/clients.service';
import { Client } from '../../../clients/models/client';

@Component({
  selector: 'app-cases-form',
  standalone: false,
  templateUrl: './cases-form.component.html',
  styleUrl: './cases-form.component.css',
})
export class CasesFormComponent implements OnInit, OnDestroy {
  caseForm: FormGroup = new FormGroup({});
  caseTypes = signal<CaseType[]>([]);
  caseStatuses = signal<CaseStatus[]>([]);
  users = signal<User[]>([]);
  courtTypes = signal<CourtType[]>([]);
  clients = signal<Client[]>([]);

  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private caseService: CasesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private caseTypesService: CaseTypesService,
    private caseStatusService: CaseStatusesService,
    private usersService: AuthService,
    private courtTypesService: CourtTypesService,
    private clientService: ClientsService
  ) {
    this.buildForm();
  }

  buildForm() {
    this.caseForm = this.formBuilder.group({
      id: [0],
      lawFirmId: [1],
      caseNumber: [''],
      courtCaseNumber: [''],
      title: [''],
      caseTypeId: [0],
      description: [''],
      caseStatusId: [0],
      courtTypeId: [0],
      filingDate: [new Date()],
      primaryAttorneyId: [0],
      originatingAttorneyId: [0],
      status: ['Open'],
      createdBy: [''],
      clientId: [0],
      isActive: [true],
    });
  }

  ngOnInit(): void {
    this.loadCaseTypes();
    this.loadCaseStatuses();
    this.loadUsers();
    this.loadCourtTypes();
    this.loadClients();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadCaseTypes() {
    this.caseTypesService
      .getCaseTypes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (caseTypes) => {
          this.caseTypes.set(caseTypes as CaseType[]);
        },
        error: (error) => {
          console.error('Error fetching case types:', error);
        },
      });
  }

  loadCaseStatuses() {
    this.caseStatusService
      .getCaseStatuses()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (caseStatuses) => {
          this.caseStatuses.set(caseStatuses as CaseStatus[]);
        },
        error: (error) => {
          console.error('Error fetching case statuses:', error);
        },
      });
  }

  loadUsers() {
    this.usersService
      .getAllUsers()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (users) => {
          console.log({ users });
          this.users.set(users as User[]);
        },
        error: (error) => {
          console.error('Error fetching users:', error);
        },
      });
  }

  loadCourtTypes() {
    this.courtTypesService
      .getCourtTypes()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (courtTypes) => {
          this.courtTypes.set(courtTypes as CourtType[]);
        },
        error: (error) => {
          console.error('Error fetching court types:', error);
        },
      });
  }

  loadClients() {
    this.clientService.getClients().subscribe({
      next: (clients) => {
        console.log({ clients });
        this.clients.set(clients as Client[]);
      },
      error: (error) => {
        console.error('Error fetching clients:', error);
      },
    });
  }

  getClientName(client: Client): string {
    if (client.firstName && client.lastName) {
      return `${client.firstName} ${client.lastName}`;
    }

    return client.companyName || 'N/A';
  }

  handleSubmit() {
    if (this.caseForm.valid) {
      const { id, status, isActive, ...caseData } = this.caseForm.value;

      console.log(caseData);
      caseData.courtTypeId = Number(caseData.courtTypeId);
      caseData.caseTypeId = Number(caseData.caseTypeId);
      caseData.caseStatusId = Number(caseData.caseStatusId);
      caseData.lawFirmId = Number(caseData.lawFirmId);
      caseData.clientId = Number(caseData.clientId);

      this.usersService.currentUser$.subscribe(
        (user) => (caseData.createdBy = user?.username || 'unknown')
      );

      this.caseService.createCase(caseData).subscribe({
        next: (response) => {
          console.log('Case created successfully:', response);
          this.router.navigate(['/cases']);
        },
        error: (error) => {
          console.error('Error creating case:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}
