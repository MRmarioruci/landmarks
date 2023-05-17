import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestsService } from '../requests.service';

@Component({
	selector: 'app-landmark',
	templateUrl: './landmark.component.html',
	styleUrls: ['./landmark.component.scss']
})
export class LandmarkComponent {
	private initialized = false;
	public landmark:any;
	public loading:boolean = false
	constructor(private route: ActivatedRoute, 	private _requests:RequestsService, private router:Router){
	}

	goBack(){
		this.router.navigate(['/']);
	}
	openImageInNewTab(image:string){
		window.open(image, '_blank');
	}
	ngOnInit() {
		this.loading = true
		if (!this.initialized) {
			const landmark_id = this.route.snapshot.paramMap.get('id') || '' ;
			this._requests.getLandmarks('', landmark_id).subscribe(
				(data: any) => {
					if (data.status === 'SUCCESS') {
						this.landmark = Object.values(data.data)[0];
					}
					this.loading = false;
				},
				(error: any) => {
					console.log(error);
					this.loading = false;
				}
			)
			this.initialized = true;
		}
	}
}
