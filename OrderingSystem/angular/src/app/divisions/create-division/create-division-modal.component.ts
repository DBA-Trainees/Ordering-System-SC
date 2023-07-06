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
    DivisionServiceProxy,
    CreateDivisionDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-division-modal.component.html'
})


export class CreateDivisionModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    division = new CreateDivisionDto();
    id: number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _divisionServiceProxy: DivisionServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
    }

    save(): void {
        this.saving = true;

        this._divisionServiceProxy.create(this.division).subscribe(
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