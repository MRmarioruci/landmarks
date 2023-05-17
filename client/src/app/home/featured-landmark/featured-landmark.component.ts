import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-featured-landmark',
	templateUrl: './featured-landmark.component.html',
	styleUrls: ['./featured-landmark.component.scss']
})
export class FeaturedLandmarkComponent {
	@Input() landmark:any;
	@Input() public goTo!: (landmark_id:string) => void;
}
