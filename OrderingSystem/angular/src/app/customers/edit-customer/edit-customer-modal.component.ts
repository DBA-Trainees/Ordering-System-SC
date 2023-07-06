import {
    Component,
    Injector,
    OnInit,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import {
    CustomerServiceProxy,
    CustomerDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'edit-customer-modal.component.html'
})

export class EditCustomerModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    customer = new CustomerDto();
    id: number;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        public _customerServiceProxy: CustomerServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        this._customerServiceProxy.get(this.id).subscribe((result) => {
            this.customer = result;
        }
        )
    }

    save(): void {
        this.saving = true;
    
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
      }
}
