import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';
import { ActivatedRoute } from '@angular/router';
@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
	username:string = '';
	loading:boolean = false;
	currentLandmark = null;
	currentLandmarkId:string = '';
	constructor(private _requests: RequestsService, private route: ActivatedRoute){}
	
	isLogged() {
		this.loading = true;
		this._requests.isLogged().subscribe(
			(data: any) => {
				if(data.status === 'SUCCESS'){
					this.setUsername(data.data);
				}
				this.loading = false;
			},
			(error: any) => {
				console.log(error);
				this.loading = false;
			}
		)
	}
	login(){
		this.loading = true;
		this._requests.login('admin' ,'admin').subscribe(
			(data: any) => {
				if(data.status === 'SUCCESS'){
					console.log(data.data);
				}
				this.loading = false;
			},
			(error: any) => {
				console.log(error);
				this.loading = false;
			}
		)
	}
	setCurrentLandmark(landmark:any){
		this.currentLandmark = landmark;
		this.currentLandmarkId = landmark.objectId;
	}
	setUsername(username:string){
		this.username = username;
	}
	ngOnInit(){
		this.currentLandmarkId = this.route.snapshot.paramMap.get('id') || '';
		this.isLogged();
	}
}
