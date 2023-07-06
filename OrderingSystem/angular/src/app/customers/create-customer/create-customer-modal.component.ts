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
    CustomerServiceProxy,
    CreateCustomerDto
} from '@shared/service-proxies/service-proxies';
import { AbpValidationError } from '@shared/components/validation/abp-validation.api';

@Component({
    templateUrl: 'create-customer-modal.component.html'
})

export class CreateCustomerModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    customer = new CreateCustomerDto();

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _customerServiceProxy: CustomerServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    save(): void {
        this.saving = true;

        this._customerServiceProxy.create(this.customer).subscribe(
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