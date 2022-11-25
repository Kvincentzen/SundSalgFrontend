import { Router, ActivatedRoute } from '@angular/router';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { RepositoryService } from '../../shared/services/repository.service';
import { UserProfile } from 'src/app/_interfaces/user/userProfileDto.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  editForm: FormGroup;
  profile: UserProfile;
  errorMessage: string = '';
  showError: boolean;

  constructor(
    private authService: AuthenticationService, 
    private router: Router,
    private repository: RepositoryService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProfile();
    this.editForm = new FormGroup({
      firstName: new FormControl(''),
      lastName: new FormControl('')
    });
  }
  public validateControl = (controlName: string) => {
    return this.editForm.get(controlName).invalid && this.editForm.get(controlName).touched
  }
  public hasError = (controlName: string, errorName: string) => {
    return this.editForm.get(controlName).hasError(errorName)
  }

  getProfile = () => {
    const id: string = this.route.snapshot.params['id'];
    const apiAddress: string = `api/accounts/${id}`;
    this.repository.getProfileData(apiAddress)
    .subscribe({
        next: (con: UserProfile) => this.profile = con,
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  public editUser = (editFormValue) => {
    const id: string = this.route.snapshot.params['id'];
    this.showError = false;
    const formValues = { ...editFormValue };

    const user: UserProfile = {
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      email: this.route.snapshot.params['id']
    };
    this.authService.editUser("api/accounts/edit", user)
    .subscribe({
      next: (_) => this.router.navigate([`/authentication/profile/${id}`]),
      error: (err: HttpErrorResponse) => {
        this.errorMessage = err.message;
        this.showError = true;
      }
    })
  }
}
