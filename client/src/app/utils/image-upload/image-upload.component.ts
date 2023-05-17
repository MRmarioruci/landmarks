import { Component, Input, EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { NgProgress, NgProgressRef } from 'ngx-progressbar';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.scss']
})
export class ImageUploadComponent {
	@Input() id: string = '';
	@Input() initialValue: string = '';
	@Input() key: string = '';
	@Output() storeNewValue = new EventEmitter<object>();
	preview: string | ArrayBuffer | null = null;
	selectedFile: File | null = null;
	errorMessage = '';
	showProgressBar = false;
	uploadProgress = 0;
	progressRef!: NgProgressRef;

	constructor(private http: HttpClient, private ngProgress: NgProgress) { }

	onFileSelected(event: any) {
		this.selectedFile = event.target.files[0] as File;
		this.upload();
	}
	previewImage() {
		const reader = new FileReader();
		reader.onload = () => {
			this.preview = reader.result;
		};
		reader.readAsDataURL(this.selectedFile as Blob);
	}
	ngOnInit(){
		this.preview = this.initialValue;		
	}
	upload() {
		if (this.selectedFile) {
			if (this.selectedFile.size <= 5 * 1024 * 1024) { // 5MB limit
				this.previewImage();
				this.errorMessage = '';
				this.showProgressBar = true;

				const formData = new FormData();
				formData.append('objectId', this.id);
				formData.append('fieldName', this.key);
				formData.append('file', this.selectedFile);

				this.progressRef = this.ngProgress.ref();
				this.progressRef.start();

				this.http.post('http://localhost:5000/imageUpload', formData, { reportProgress: true, observe: 'events' })
					.subscribe(event => {
						if (event.type === HttpEventType.UploadProgress) {
							const progress = Math.round((100 * event.loaded) / (event.total || 100));
							this.uploadProgress = progress;
						} else if (event.type === HttpEventType.Response) {
							this.uploadProgress = 0;
							this.showProgressBar = false;
							console.log('File uploaded:', this.selectedFile);
						}
					}, error => {
						this.uploadProgress = 0;
						this.showProgressBar = false;
						this.errorMessage = 'Error uploading file.';
						console.error(error);
					}, () => {
						this.progressRef.complete();
					});

			} else {
				this.errorMessage = 'File size exceeds the limit of 5MB.';
			}
		} else {
			this.errorMessage = 'No file selected.';
		}
	}
}
