import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { InitComponent } from "./init/init.component";
import { PersonalInfoComponent } from "./personal-info/personal-info.component";
import { ProductConfigComponent } from "./product-config/product-config.component";
import { SaleComponent } from "./sale/sale.component";
import { PagesComponent } from "./pages.component";
import { PagesGuard } from "../guards/pages.guard";

const routes: Routes = [
    { path: 'init', component: InitComponent, canActivate: [PagesGuard] },
    { path: 'dashboard', component: DashboardComponent, canActivate: [PagesGuard] },
    {
        path: 'credit', 
        component: PagesComponent,
        canActivate: [PagesGuard],
        children: [
            { path: 'personal-info', component: PersonalInfoComponent },
            { path: 'product-config', component: ProductConfigComponent },
            { path: 'sale', component: SaleComponent },
            { path: '', component: PersonalInfoComponent },

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}