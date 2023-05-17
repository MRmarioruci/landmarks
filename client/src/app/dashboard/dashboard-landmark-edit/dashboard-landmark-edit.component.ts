import { Component, Input } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-dashboard-landmark-edit',
	templateUrl: './dashboard-landmark-edit.component.html',
})
export class DashboardLandmarkEditComponent {
	@Input() currentLandmark:any;
	loading:boolean = false;
	constructor(private _requests: RequestsService, private route: ActivatedRoute) {}
	storeNewValue(changes:object){
		this._requests.editLandmark(changes).subscribe(
			(data: any) => {
				console.log(data);
			},
			(e: any) => {
				console.log(e);
			}
		)				
	}
	ngOnInit() {
		this.route.params.subscribe((params) => {
			const parameterValue = params['id'];
			// Handle the changed URL parameter here
			console.log('URL parameter changed:', parameterValue);
			// Trigger any necessary actions or update the component's view
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 0);
		});
	}
}
