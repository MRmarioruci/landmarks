import { Component, EventEmitter, Output, Input } from '@angular/core';
import { RequestsService } from '../../requests.service';
import { Router } from '@angular/router';
import 'bootstrap/dist/js/bootstrap.js'; // Import Bootstrap JavaScript

@Component({
	selector: 'app-dashboard-landmarks-list',
	templateUrl: './dashboard-landmarks-list.component.html',
})
export class DashboardLandmarksListComponent {
	landmarks:any[] = []
	loading:boolean = false;
	@Input() currentLandmarkId:any;
	@Output() setCurrentLandmark = new EventEmitter<string>();
	constructor(private _requests: RequestsService, private router:Router) { }

	getLandmarks() {
		this.loading = true;
		this._requests.getLandmarks('', '').subscribe(
			(data: any) => {
				if(data.status === 'SUCCESS'){
					const d = Object.values(data.data);
					this.landmarks = d;
					if(this.currentLandmarkId){
						this.goTo(this.currentLandmarkId);
					}else{
						this.goTo(this.landmarks[0]['objectId']);
					}
				}
				this.loading = false;
			},
			(error: any) => {
				console.log(error);
				this.loading = false;
			}
		)
	}
	goTo(landmark_id:string){
		this.router.navigate(['/dashboard', landmark_id]);
		const l = this.landmarks.find( (landmark) => landmark.objectId === landmark_id);
		if(l){
			this.setCurrentLandmark.emit(l);
		}
	}
	ngOnInit() {
		this.getLandmarks();
	}
}