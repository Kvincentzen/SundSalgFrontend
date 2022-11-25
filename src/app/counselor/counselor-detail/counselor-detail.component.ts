import { Counselor } from '../../_interfaces/counselor.model'
import { ActivatedRoute } from '@angular/router';
import { RepositoryService } from '../../shared/services/repository.service';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-counselor-detail',
  templateUrl: './counselor-detail.component.html',
  styleUrls: ['./counselor-detail.component.css']
})
export class CounselorDetailComponent implements OnInit {
  public counselor: Counselor;

  constructor(
    private repository: RepositoryService,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.getCounselor();
  }

  getCounselor = () => {
    const id: string = this.route.snapshot.params['id'];
    const apiAddress: string = `api/counselor/${id}`;
    this.repository.getCounselorData(apiAddress)
    .subscribe({
        next: (con: Counselor) => this.counselor = con,
        error: (err: HttpErrorResponse) => console.log(err)
    })
  }
}