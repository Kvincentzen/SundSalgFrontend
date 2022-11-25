import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounselorsComponent } from './counselors/counselors.component';
import { CounselorDetailComponent } from './counselor-detail/counselor-detail.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [
        CounselorsComponent,
        CounselorDetailComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'counselors', component: CounselorsComponent },
            { path: 'details/:id', component: CounselorDetailComponent }
        ])
    ]
})
export class CounselorModule { }