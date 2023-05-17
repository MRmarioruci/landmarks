import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { RequestsService } from 'src/app/requests.service';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-dashboard-landmark-edit',
	templateUrl: './dashboard-landmark-edit.component.html',
})
export class DashboardLandmarkEditComponent {
	@Input() currentLandmark:any;
	loading:boolean = false;
	saved: boolean = false;
	constructor(private _requests: RequestsService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {}
	storeNewValue(changes:object){
		this._requests.editLandmark(changes).subscribe(
			(data: any) => {
				if(data.status === 'SUCCESS'){
					this.saved = true;
					setTimeout(() => {
						this.saved = false;
					}, 1500)
				}
			},
			(e: any) => {
				console.log(e);
			}
		)				
	}
	ngOnInit() {
		this.route.params.subscribe((params) => {
			/* Kind of a hacky way to re-render but works for now */
			this.loading = true;
			setTimeout(() => {
				this.loading = false;
			}, 0);
		});
	}
}