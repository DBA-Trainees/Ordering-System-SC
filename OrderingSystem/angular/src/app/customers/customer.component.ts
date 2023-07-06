import {
    Component,
    Injector,
    OnInit
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    CustomerDto,
    CustomerDtoPagedResultDto,
    CustomerServiceProxy
} from '@shared/service-proxies/service-proxies';
import { EditCustomerModalComponent } from './edit-customer/edit-customer-modal.component';
import { CreateCustomerModalComponent } from './create-customer/create-customer-modal.component';

class PagedCustomerRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html'
})

export class CustomersComponent extends PagedListingComponentBase<CustomerDto>{
    customers: CustomerDto[] = [];
    keyword = '';
    isActive: boolean | null;
    advancedFiltersVisible = false;

    constructor(
        injector: Injector,
        private _customerServiceProxy: CustomerServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector)
    }

    protected list(
        request: PagedCustomerRequestDto,
        pageNumber: number,
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._customerServiceProxy
            .getAll(
              request.keyword,
              request.isActive,
              request.skipCount,
              request.maxResultCount
            )
            .pipe(
                finalize(() => {
                    finishedCallback();
                })
            )
            .subscribe((result: CustomerDtoPagedResultDto) => {
                this.customers = result.items;
                this.showPaging(result, pageNumber);
            });
    }
    protected delete(customer: CustomerDto): void {
        abp.message.confirm(
          this.l('UserDeleteWarningMessage', customer.name),
          undefined,
          (result: boolean) => {
            if (result) {
              this._customerServiceProxy.delete(customer.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            }
          }
        );
      }
    create(): void {
        this.showCreateOrEditCustomerModal;
    }

    edit(id): void {
        this.showCreateOrEditCustomerModal(id);
    }

    private showCreateOrEditCustomerModal(id?: number): void {
        let createOrEditCustomerModal: BsModalRef;
        if (!id) {
          createOrEditCustomerModal = this._modalService.show(
            CreateCustomerModalComponent,
            {
              class: 'modal-lg',
            }
          );
        } else {
          createOrEditCustomerModal = this._modalService.show(
            CreateCustomerModalComponent,
            {
              class: 'modal-lg'
            }
          );
        }
    
        createOrEditCustomerModal.content.onSave.subscribe(() => {
          this.refresh();
        });
      }
}