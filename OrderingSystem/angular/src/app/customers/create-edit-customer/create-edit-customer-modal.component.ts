import {
    Component,
    OnInit,
    Injector,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
    CustomerServiceProxy,
    CustomerDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-customer-modal.component.html'
})

export class CreateEditCustomerModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    customer = new CustomerDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _customerServiceProxy: CustomerServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if(this.id){
            this._customerServiceProxy.get(this.id).subscribe((res) => {
                this.customer = res;
            });
        }
    }

    save(): void {
        this.saving = true;
        if(this.id != 0){
            this._customerServiceProxy.update(this.customer).subscribe(
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
}