import { Router, ActivatedRoute } from '@angular/router';
import { PasswordConfirmationValidatorService } from '../../shared/custom-validators/password-confirmation-validator.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/services/authentication.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { RepositoryService } from '../../shared/services/repository.service';
import { UserProfile } from 'src/app/_interfaces/user/userProfileDto.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: UserProfile
  errorMessage: string = '';
  showError: boolean;

  constructor(private authService: AuthenticationService, 
    private passConfValidator: PasswordConfirmationValidatorService, private router: Router,
    private repository: RepositoryService, private route: ActivatedRoute) { }

    ngOnInit(): void {
    this.getProfile();
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
  editProfile = () => {
    const id: string = this.route.snapshot.params['id'];
    const detailsUrl: string = `/authentication/edit/${id}`; 
    this.router.navigate([detailsUrl]); 
  }
}
