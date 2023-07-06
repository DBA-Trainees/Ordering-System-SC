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
    DivisionServiceProxy,
    DivisionDto
} from '@shared/service-proxies/service-proxies';

@Component({
    //selector: 'selector-name',
    templateUrl: 'edit-division-modal.component.html'
})

export class EditDivisionModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    division = new DivisionDto();
    id: number;

    @Output() onSave = new EventEmitter<any>();


    constructor(
        injector: Injector,
        public _divisionServiceProxy: DivisionServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }


    ngOnInit(): void {
        this._divisionServiceProxy.get(this.id).subscribe((result) => {
            this.division = result;
        })
    }

    save(): void {
        this.saving = true;

        this._divisionServiceProxy.update(this.division).subscribe(
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