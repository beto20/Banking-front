import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PagesComponent } from "./pages.component";
import { InitComponent } from './init/init.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';
import { ProductConfigComponent } from './product-config/product-config.component';
import { SaleComponent } from './sale/sale.component';

@NgModule({
    declarations: [
        PagesComponent,
        InitComponent,
        DashboardComponent,
        PersonalInfoComponent,
        ProductConfigComponent,
        SaleComponent,
    ],
    imports: [
        RouterModule
    ],
    exports: [
        PagesComponent
    ]
})
export class PagesModule {}