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
    CreateCategoryDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-category-modal.component.html'
})


export class CreateCategoryModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    category = new CreateCategoryDto();
    id: number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _categoryServiceProxy: CategoryServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

        this._categoryServiceProxy.create(this.category).subscribe(
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