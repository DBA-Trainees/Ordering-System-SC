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
    CategoryServiceProxy,
    CategoryDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-category-modal.component.html'
})


export class CreateEditCategoryModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    category = new CategoryDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _categoryServiceProxy: CategoryServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
         if(this.id){
            this._categoryServiceProxy.get(this.id).subscribe((res) => {
                this.category = res;
            });
        }
    }

    save(): void {
        this.saving = true;

        if(this.id != 0){
            this._categoryServiceProxy.update(this.category).subscribe(
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
            this._categoryServiceProxy.create(this.category).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            )
        }
    }
}