import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CaseType } from '../../../maintenance/models/case-type';
import { CaseStatus } from '../../../maintenance/models/case-status';
import { User } from '../../../../core/models/user';
import { CourtType } from '../../../maintenance/models/court-type';
import { Client } from '../../../clients/models/client';
import { Subject, takeUntil } from 'rxjs';
import { CasesService } from '../../services/cases.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CaseTypesService } from '../../../maintenance/services/case-types.service';
import { CaseStatusesService } from '../../../maintenance/services/case-statuses.service';
import { AuthService } from '../../../../core/services/auth.service';
import { CourtTypesService } from '../../../maintenance/services/court-types.service';
import { ClientsService } from '../../../clients/services/clients.service';
import { Case } from '../../models/case';
import { CaseDocument, CreateFileDto } from '../../models/case-document';
import { FileUploadService } from '../../../../core/services/file-upload.service';
import { ToastrService } from 'ngx-toastr';
import { fileIconSelector } from '../../../../core/utils/file-icon-selector';

@Component({
  selector: 'app-cases-details',
  standalone: false,
  templateUrl: './cases-details.component.html',
  styleUrl: './cases-details.component.css',
})
export class CasesDetailsComponent implements OnInit, OnDestroy {
  caseForm: FormGroup = new FormGroup({});
  caseTypes = signal<CaseType[]>([]);
  caseStatuses = signal<CaseStatus[]>([]);
  users = signal<User[]>([]);
  courtTypes = signal<CourtType[]>([]);
  clients = signal<Client[]>([]);

  caseDocuments = signal<CaseDocument[]>([]);

  selectedDocument?: File;

  caseId: string = '';

  unsubscribe: Subject<void> = new Subject<void>();

  constructor(
    private caseService: CasesService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private caseTypesService: CaseTypesService,
    private caseStatusService: CaseStatusesService,
    private usersService: AuthService,
    private courtTypesService: CourtTypesService,
    private clientService: ClientsService,
    private fileUploadService: FileUploadService,
    private authService: AuthService,
    private toastr: ToastrService
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
      createdBy: [''],
      clientId: [0],
    });
  }

  ngOnInit(): void {
    this.caseId = this.route?.snapshot?.paramMap.get('id') ?? '';
    this.loadCaseTypes();
    this.loadCaseStatuses();
    this.loadUsers();
    this.loadCourtTypes();
    this.loadClients();
    this.loadCaseInfo();
    this.loadDocuments();
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  loadCaseInfo() {
    if (this.caseId) {
      this.caseService
        .getCase(this.caseId)
        .pipe(takeUntil(this.unsubscribe))
        .subscribe({
          next: (res) => {
            console.log({ res });
            this.setCaseInfo(res);
          },
          error: (err) => {
            console.log(err);
          },
        });
    }
  }

  setCaseInfo(caseFromDb: Case) {
    this.caseForm.patchValue({
      id: caseFromDb.id,
      lawFirmId: caseFromDb.lawFirmId,
      caseNumber: caseFromDb.caseNumber,
      courtCaseNumber: caseFromDb.courtCaseNumber,
      title: caseFromDb.title,
      caseTypeId: caseFromDb.caseTypeId,
      description: caseFromDb.description,
      caseStatusId: caseFromDb.caseStatusId,
      courtTypeId: caseFromDb.courtTypeId,
      filingDate: caseFromDb.filingDate
        ? caseFromDb.filingDate.toString().split('T')[0]
        : null,
      primaryAttorneyId: caseFromDb.primaryAttorneyId,
      originatingAttorneyId: caseFromDb.originatingAttorneyId,
      createdBy: caseFromDb.createdById,
      clientId: caseFromDb?.parties.find((party) => party.isClient)
        ?.clientId as number,
    });
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

  loadDocuments() {
    this.fileUploadService.getDocumentsByCase(this.caseId).subscribe({
      next: (res) => {
        console.log({ res });
        this.caseDocuments.set(res as CaseDocument[]);
      },
    });
  }

  get caseNumber() {
    return this.caseForm.get('caseNumber')?.value;
  }

  getClientName(client: Client): string {
    if (client.firstName && client.lastName) {
      return `${client.firstName} ${client.lastName}`;
    }

    return client.companyName || 'N/A';
  }

  getIconForDocument(doc: any): string {
    return fileIconSelector(doc.fileName);
  }

  onFileSelected(e: any) {
    const fileList: FileList = e.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedDocument = fileList[0];
    }
  }

  uploadFile() {
    if (this.selectedDocument) {
      const createFileDto: CreateFileDto = {
        file: this.selectedDocument,
        caseId: this.caseId,
        clientId: this.caseForm.get('clientId')?.value,
        documentTypeId: '1',
        versionNumber: '1',
        createdBy: 'asevilla16',
      };

      this.authService.currentUser$.subscribe(
        (user) => (createFileDto.createdBy = user?.username || 'unknown')
      );

      this.fileUploadService.uploadFile(createFileDto).subscribe({
        next: (res) => {
          this.selectedDocument = undefined;
          this.loadDocuments();
        },
        error: (err) => {
          console.log({ err });
        },
      });
    }
  }

  downloadFile(filename: string, originalName: string) {
    console.log({ originalName });
    this.fileUploadService.downloadFile(filename).subscribe({
      next: (blob: Blob) => {
        // const correctBlob = new Blob([blob], { type: mimeType });
        const fileExtension = originalName.substring(
          originalName.lastIndexOf('.')
        );
        const fileNameWithoutExt = originalName.substring(
          0,
          originalName.lastIndexOf('.')
        );

        this.handleBlobDownload(
          blob,
          `${fileNameWithoutExt}_${this.caseNumber}${fileExtension}`
        );
      },
      error: (err) => {
        console.error('Error downloading file:', err);
      },
    });
  }

  handleBlobDownload(blob: Blob, filename: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    a.remove();
  }

  handleSubmit() {
    const { id, caseStatusId, caseTypeId, clientId, filingDate, ...restForm } =
      this.caseForm.value;

    const caseObject = {
      ...restForm,
      caseTypeId: +caseTypeId,
      caseStatusId: +caseStatusId,
      caseId: id.toString(),
      clientId: +clientId,
      filingDate: new Date(filingDate),
    };
    console.log({ caseObject });

    this.caseService.updateCase(this.caseId, caseObject).subscribe({
      next: (res: any) => {
        this.toastr.success(
          'Se ha modificado la informacion del caso',
          'Éxito'
        );
        this.router.navigate(['/cases']);
      },
      error: (err) => {
        console.error('An error has occurred', err);
      },
    });
  }
}
