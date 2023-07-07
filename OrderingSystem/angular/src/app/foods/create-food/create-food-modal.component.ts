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
    CreateFoodDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-food-modal.component.html'
})


export class CreateFoodModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    food = new CreateFoodDto();
    id: number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _foodServiceProxy: FoodServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

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