import {
    Component,
    OnInit,
    Injector,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    FoodServiceProxy,
    FoodDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-food-modal.component.html'
})


export class CreateEditFoodModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    food = new FoodDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _foodServiceProxy: FoodServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
        if(this.id){
            this._foodServiceProxy.get(this.id).subscribe((res) => {
                this.food = res;
            })
        }
    }

    save(): void {
        this.saving = true;

        if(this.id != 0){
            this._foodServiceProxy.update(this.food).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            );
        }else{
            this._foodServiceProxy.create(this.food).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            );
        }       
    }
}