import {
    Component,
    Injector
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
import { CreateEditCustomerModalComponent } from './create-edit-customer/create-edit-customer-modal.component';

class PagedCustomerRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: 'customer.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ["./customer.component.css"]
})

export class CustomersComponent extends PagedListingComponentBase<CustomerDto>{
    customers: CustomerDto[] = [];
    keyword = '';
    isActive: boolean | null;
/*     advancedFiltersVisible = false;
 */
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
            .getAllCustomersWithDivision(
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
              })
            }
          }
        );
      }
    createCustomer(): void {
        this.showCreateOrEditCustomerModal();
    }

    editCustomer(id): void {
        this.showCreateOrEditCustomerModal(id);
    }

    private showCreateOrEditCustomerModal(id?: number): void {
        let createOrEditCustomerModal: BsModalRef;
        if (!id) {
          createOrEditCustomerModal = this._modalService.show(
            CreateEditCustomerModalComponent,
            {
              class: 'modal-lg',
            }
          );
        } else {
          createOrEditCustomerModal = this._modalService.show(
            CreateEditCustomerModalComponent,
            {
              class: 'modal-lg',
              initialState: {
                id: id,
              }
            }
          );
        }
    
        createOrEditCustomerModal.content.onSave.subscribe(() => {
          this.refresh();
        });
      }
}