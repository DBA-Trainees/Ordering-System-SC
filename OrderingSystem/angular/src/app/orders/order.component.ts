import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { 
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import { 
    OrderDto,
    OrderDtoPagedResultDto,
    OrderServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateEditViewOrderModalComponent } from './create-edit-view-order/create-edit-view-order-modal.component';

class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: 'order.component.html',
    animations: [appModuleAnimation()]
})

export class OrdersComponent extends PagedListingComponentBase<OrderDto>{
    orders: OrderDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector)
    }

    protected list(
        request: PagedOrderRequestDto,
        pageNumber: number,
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;
    
        this._orderServiceProxy
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
          .subscribe((result: OrderDtoPagedResultDto) => {
            this.orders = result.items;
            this.showPaging(result, pageNumber);
          });
      }
      protected delete(order: OrderDto): void {
        abp.message.confirm(
          this.l('UserDeleteWarningMessage', order.size),
          undefined,
          (result: boolean) => {
            if (result) {
              this._orderServiceProxy.delete(order.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            }
          }
        );
      }
    
      createOrder(): void {
        this.showCreateEditViewOrderModal();
      }
    
      editOrder(id): void {
        this.showCreateEditViewOrderModal(id);
      }
    
      private showCreateEditViewOrderModal(id?: number): void {
        let createEditViewOrderModal: BsModalRef;
        if (!id) {
          createEditViewOrderModal = this._modalService.show(
            CreateEditViewOrderModalComponent,
            {
              class: 'modal-lg',
            }
          );
        } else {
          createEditViewOrderModal = this._modalService.show(
            CreateEditViewOrderModalComponent,
            {
              class: 'modal-lg',
              initialState: {
                id: id,
              }
            }
          );
        }
    
        createEditViewOrderModal.content.onSave.subscribe(() => {
          this.refresh();
        });
      }
}