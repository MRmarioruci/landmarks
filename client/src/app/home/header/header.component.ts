import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RequestsService } from 'src/app/requests.service';

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	private initialized: boolean = false;
	@Input() username:any;
	constructor(private router: Router, private _requests:RequestsService) {}
	login(){
		this.router.navigate(['/dashboard']);
	}
	logout() {
		this._requests.logout().subscribe(
			(data: any) => {
				console.log(data);
				this.router.navigate(['/dashboard']);
			},
			(error: any) => {
				console.log(error);
			}
		)
	}
	goToHome(){
		this.router.navigate(['/']);
	}
}
