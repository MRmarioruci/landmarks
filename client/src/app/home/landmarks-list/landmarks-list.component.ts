import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-landmarks-list',
	templateUrl: './landmarks-list.component.html',
})
export class LandmarksListComponent {
	@Input() public landmarks:any;
	@Input() public hasSearchTerm!:boolean;
	@Input() public goTo!: (landmark_id:string) => void;
}
