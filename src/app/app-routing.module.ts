import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { AuthRoutingModule } from "./auth/auth.routing";
import { PagesRoutingModule } from "./pages/pages.routing";


const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', component: NopagefoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        AuthRoutingModule,
        PagesRoutingModule
    ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}