import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventsComponent } from './events/events.component';
import { SpecialEventsComponent } from './special-events/special-events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth.guard';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { GeoChartComponent } from './geo-chart/geo-chart.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/events',
        pathMatch: "full"
    },
    {
        path: 'events',
        component: EventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'special',
        component: SpecialEventsComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'barChart',
        component: BarChartComponent,
    },
    {
        path: 'geoChart',
        component: GeoChartComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }