import { Counselor } from './../../_interfaces/counselor.model'
import { RepositoryService } from '../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-counselors',
  templateUrl: './counselors.component.html',
  styleUrls: ['./counselors.component.css']
})
export class CounselorsComponent implements OnInit {
  public counselors: Counselor[];

  constructor(private repository: RepositoryService, private router: Router) { }

  ngOnInit(): void {
    this.getCounselors();
  }

  getCounselors = () => {
    const apiAddress: string = "api/counselor";
    this.repository.getCounselorsData(apiAddress)
    .subscribe({
        next: (con: Counselor[]) => this.counselors = con,
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }
  public getCounselorDetails = (id) => { 
    const detailsUrl: string = `/counselor/details/${id}`; 
    this.router.navigate([detailsUrl]); 
  }
}