import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'app-editable-input',
	templateUrl: './editable-input.component.html',
	styleUrls: ['./editable-input.component.scss']
})
export class EditableInputComponent {
	@Input() type:string = 'text';
	@Input() id:string = '';
	@Input() initialValue:string = '';
	@Input() key:string = '';
	@Output() storeNewValue = new EventEmitter<object>();
	value:string='';

	ngOnInit(){
		this.value = this.initialValue;
	}
	onBlur(){
		/* No need to update if it's the same one */
		if(this.value == this.initialValue) return;
		this.storeNewValue.emit({
			objectId: this.id,
			fieldName: this.key,
			fieldValue: this.value
		})
		this.initialValue = this.value;
	}
}
