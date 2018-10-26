import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InputModalComponent } from './input-modal/input-modal.component';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HomeService } from './home/home.service';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
    { path: '', component: HomeComponent },
];

@NgModule({
    imports: [
        NgbModule,
        HttpClientModule,
        SharedModule,
        RouterModule.forChild(routes)
    ],
    declarations: [HomeComponent, InputModalComponent],
    exports: [
        RouterModule
    ],
    entryComponents: [
        InputModalComponent
    ],
    providers: [
        NgbActiveModal,
        HomeService
    ]
})
export class HomeModule { }
