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
    CustomerDto,
    DivisionDto,
    DivisionServiceProxy,
    CreateCustomerDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-customer-modal.component.html'
})

export class CreateEditCustomerModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    customer = new CreateCustomerDto();
    customers = new CustomerDto;
    division = new DivisionDto;
    divisions: DivisionDto[] = [];
    id: number = 0;
    selectDivisionId : number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _customerServiceProxy: CustomerServiceProxy,
        private _divisionServiceProxy: DivisionServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit(): void {
        if (this.id != 0){
            if(this.id){
                this._customerServiceProxy.get(this.id).subscribe((res) => {
                    this.customer = res;
                    this.selectDivisionId = res.division.id;
                })
                this._divisionServiceProxy.getAllDivisions().subscribe((res) => {
                    this.divisions = res;
                });
            }
        }
        else{
            this._divisionServiceProxy.getAllDivisions().subscribe((res) => {
                this.divisions = res;
            })
        }
    }

    save(): void {
        this.saving = true;
        this.customer.divisionId = this.selectDivisionId;

        if(this.id != 0){
            this._customerServiceProxy.update(this.customers).subscribe(
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