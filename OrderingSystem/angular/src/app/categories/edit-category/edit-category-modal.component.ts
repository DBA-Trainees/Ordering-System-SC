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
    CategoryServiceProxy,
    CategoryDto
} from '@shared/service-proxies/service-proxies';

@Component({
    //selector: 'selector-name',
    templateUrl: 'edit-category-modal.component.html'
})

export class EditCategoryModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    category = new CategoryDto();
    id: number = null;

    @Output() onSave = new EventEmitter<any>();


    constructor(
        injector: Injector,
        private _categoryServiceProxy: CategoryServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }


    ngOnInit(): void {
        this._categoryServiceProxy.get(this.id).subscribe((result) => {
            this.category = result;
        })
    }

    save(): void {
        this.saving = true;
        this.category.id = this.id;

        if(this.id !==0){
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
        }
    }
}