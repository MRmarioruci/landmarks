import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class RequestsService {
	constructor(private http: HttpClient) { }
	api="http://localhost:5000";
	getLandmarks(searchTerm: string, landmarkId: string): Observable<any> {
		const url = `${this.api}/getLandmarks?searchTerm=${searchTerm}&landmarkId=${landmarkId}`;
		return this.http.get(url)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError('Something bad happened; please try again later.');
			})
		);
	}
	isLogged(): Observable<any> {
		const url = `${this.api}/isLogged`;
		return this.http.get(url)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError('Something bad happened; please try again later.');
			})
		);
	}
	login(username:string, password:string): Observable<any> {
		const url = `${this.api}/login`;
		const body = {
			username: username,
			password: password
		};
		return this.http.post(url, body)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError('Something bad happened; please try again later.');
			})
		);
	}
	logout(): Observable<any> {
		const url = `${this.api}/logout`;
		return this.http.post(url, {})
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError('Something bad happened; please try again later.');
			})
		);
	}
	editLandmark(changes:object): Observable<any> {
		const url = `${this.api}/editLandmark`;
		const body = changes;
		return this.http.post(url, body)
		.pipe(
			catchError((error: HttpErrorResponse) => {
				console.error('An error occurred:', error);
				return throwError('Something bad happened; please try again later.');
			})
		);
	}
}
	