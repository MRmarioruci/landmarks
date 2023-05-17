import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestsService } from 'src/app/requests.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	@Output() setUsername = new EventEmitter<string>();
	loginForm: FormGroup;
	loading:boolean = false;
	error:boolean = false;
	constructor(private formBuilder: FormBuilder, private _requests: RequestsService) {
		this.loginForm = this.formBuilder.group({
			username: ['', Validators.required],
			password: ['', Validators.required]
		});
	}
	onSubmit() {
		if (this.loginForm.invalid) {
			return;
		}
		
		const username = this.loginForm.value.username;
		const password = this.loginForm.value.password;

		this.loading = true;
		this.error = false;
		this._requests.login(username, password).subscribe(
			(data: any) => {
				this.loading = false;
				this.setUsername.emit(data.data);
			},
			(e: any) => {
				this.loginForm.reset();
				this.error = true;
				console.log(e);
				this.loading = false;
			}
		)
	}
}
