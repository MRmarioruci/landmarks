import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LandmarkComponent } from './landmark/landmark.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './dashboard/login/login.component';
import { LandmarksListComponent } from './home/landmarks-list/landmarks-list.component';
import { FeaturedLandmarkComponent } from './home/featured-landmark/featured-landmark.component';

const routes: Routes = [
	/* { path: '', redirectTo: '/articles', pathMatch: 'prefix'}, */
	{ path: '', component: HomeComponent },
	{ path: 'landmark/:id', component: LandmarkComponent },
	{ path: 'dashboard/:id', component: DashboardComponent },
	{ path: 'dashboard', component: DashboardComponent },
	{ path: '**', component: PageNotFoundComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
	HomeComponent,
	LandmarkComponent,
	PageNotFoundComponent,
	DashboardComponent,
	HeaderComponent,
	LoginComponent,
	LandmarksListComponent,
	FeaturedLandmarkComponent
];
