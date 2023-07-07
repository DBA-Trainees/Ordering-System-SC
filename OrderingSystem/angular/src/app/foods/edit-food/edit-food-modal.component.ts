import {
    Component,
    OnInit,
    Injector,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    FoodServiceProxy,
    FoodDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'edit-food-modal.component.html'
})

export class EditFoodModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    food = new FoodDto();
    id: number = null;

    @Output() onSave = new EventEmitter<any>();


    constructor(
        injector: Injector,
        private _foodServiceProxy: FoodServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }


    ngOnInit(): void {
        this._foodServiceProxy.get(this.id).subscribe((result) => {
            this.food = result;
        })
    }

    save(): void {
        this.saving = true;

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
    }
}