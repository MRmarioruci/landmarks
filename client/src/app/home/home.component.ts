import { Component } from '@angular/core';
import { RequestsService } from '../requests.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'], 
})
export class HomeComponent{
	searchTerm = '';
	queryHasSearchTerm = false;
	landmarks:any[] = [];
	loading:boolean = false;
	private initialized: boolean = false;
	constructor(private _requests: RequestsService, private router: Router) {
		/*  */
	}
	getLandmarks(){
		this.loading = true;
		this._requests.getLandmarks(this.searchTerm, '').subscribe(
			(data:any) => {
				if(data.status === 'SUCCESS'){
					this.landmarks = Object.values(data.data);
					if (this.searchTerm) {
						this.queryHasSearchTerm = true;
					} else {
						this.queryHasSearchTerm = false;
					}
				}
				this.loading = false;
			},
			(error: any) => {
				console.log(error.data);
				this.loading = false;
			}
		)
	}
	clearSearchTerm(){
		this.searchTerm = '';
		this.queryHasSearchTerm = false;
		this.getLandmarks();
	}
	goTo(landmark_id:string):void{
		window.location.href = `/landmark/${landmark_id}`;
	}
	ngOnInit(){
		if (!this.initialized){
			this.getLandmarks();
			this.initialized = true;
		}
	}
}
