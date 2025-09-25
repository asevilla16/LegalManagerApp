import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../services/clients.service';
import { Client } from '../../models/client';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients-form',
  standalone: false,
  templateUrl: './clients-form.component.html',
  styleUrl: './clients-form.component.css',
})
export class ClientsFormComponent {
  clientForm: FormGroup = new FormGroup({});
  isEditMode: boolean = false;
  clientId: number | null = null;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private clientService: ClientsService,
    private authService: AuthService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.clientForm = this.buildForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.isEditMode = true;
        this.clientId = +idParam;
        this.loadClientData(this.clientId);
      }
    });
  }

  buildForm() {
    return (this.clientForm = this.formBuilder.group({
      // Required fields
      clientType: ['', Validators.required],
      lawFirmId: [1, [Validators.required, Validators.min(1)]],
      // isActive: [true],
      createdBy: [''],

      // Individual fields
      firstName: [''],
      lastName: [''],
      middleName: [''],
      identityDocument: [''],
      birthDate: [''],
      gender: [''],

      // Corporate fields
      companyName: [''],
      taxId: [''],
      // registrationNumber: [''],
      // legalRepresentative: [''],

      // Common fields
      address: [''],
      city: [''],
      department: [''],
      postalCode: [''],
      phone: ['+504 9999-9999'],
      mobile: [''],
      email: ['', Validators.email],
      occupation: [''],
    }));
  }

  loadClientData(clientId: number) {
    this.clientService.getClientById(clientId).subscribe({
      next: (client: Client) => {
        console.log(client);
        this.clientForm.patchValue(client);
      },
      error: (error) => {
        console.error('Error loading client data:', error);
      },
    });
  }

  handleSubmit() {
    if (this.clientForm.valid) {
      this.createClient();
    } else {
      console.log('Form is invalid');
      this.clientForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }

  createClient() {
    const client: Client = this.clientForm.value;
    this.authService.currentUser$.subscribe(
      (user) => (client.createdBy = user?.username || 'unknown')
    );
    console.log({ client });
    this.clientService.createClient(client).subscribe({
      next: (response) => {
        this.toastr.success('Nuevo cliente agregado', 'Éxito');
        this.router.navigate(['/clients']);
      },
      error: (error) => {
        console.error('Error creating client', error);
      },
    });
  }

  handleCancel() {
    this.router.navigate(['/clients']);
  }
}
