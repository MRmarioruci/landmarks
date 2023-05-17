import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { FormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { ReactiveFormsModule } from '@angular/forms';

import { RequestsService } from './requests.service';
import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { LoginComponent } from './dashboard/login/login.component';
import { LandmarksListComponent } from './home/landmarks-list/landmarks-list.component';
import { FeaturedLandmarkComponent } from './home/featured-landmark/featured-landmark.component';
import { DashboardLandmarksListComponent } from './dashboard/dashboard-landmarks-list/dashboard-landmarks-list.component';
import { DashboardLandmarkEditComponent } from './dashboard/dashboard-landmark-edit/dashboard-landmark-edit.component';
import { EditableInputComponent } from './utils/editable-input/editable-input.component';
import { ImageUploadComponent } from './utils/image-upload/image-upload.component';

@NgModule({
	declarations: [
		AppComponent,
		routingComponents,
		HeaderComponent,
		LoginComponent,
		LandmarksListComponent,
		FeaturedLandmarkComponent,
		DashboardLandmarksListComponent,
		DashboardLandmarkEditComponent,
		EditableInputComponent,
  		ImageUploadComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		GoogleMapsModule,
		ReactiveFormsModule
	],
	providers: [RequestsService],
	bootstrap: [AppComponent]
})
export class AppModule { }
