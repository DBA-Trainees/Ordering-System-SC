import {
    Component,
    Injector,
    Output,
    EventEmitter
} from '@angular/core';
import { finalize } from 'rxjs/operators';
import {
    PagedListingComponentBase,
    PagedRequestDto
  } from 'shared/paged-listing-component-base';
import {
    OrderDto,
    FoodDto,
    OrderServiceProxy,
    FoodServiceProxy,
    CartDto,
    CartServiceProxy,
    CartDtoPagedResultDto
} from '@shared/service-proxies/service-proxies';
// import { ViewOrderComponent } from './view-order/view-order.component';

class PagedCartsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: 'view-order.component.html'
})


export class ViewOrderComponent extends PagedListingComponentBase<OrderDto>{
    saving = false;
    id: number;
    order = new OrderDto();
    carts: CartDto[] = [];
    food: FoodDto[] = [];
    keyword = '';
    isActive: boolean | null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        private _foodServiceProxy: FoodServiceProxy,
        private _cartServiceProxy: CartServiceProxy
    ) {
        super(injector);
    }


    protected list(
        request: PagedCartsRequestDto, 
        pageNumber: number, 
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._cartServiceProxy
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
            .subscribe((result: CartDtoPagedResultDto) => {
                this.carts = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(cart: CartDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', cart),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._cartServiceProxy.delete(cart.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        )
    }

    saveToCart(): void {
        this.saving = true;


        if(this.id > 0) {
            this._orderServiceProxy.update(this.order).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            );
        } else {
            this._orderServiceProxy.create(this.order).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            )
        }
    }
    // private showCreateOrEditCartModal(id?: number): void {
    //             let createOrEditCartModal: BsModalRef;
    //             if(!id) {
    //                 createOrEditCartModal = this._modalService.show(
    //                     ViewOrderComponent,
    //                     {
    //                         class: 'modal-lg',
    //                     }
    //                 );
    //             } else {
    //                 createOrEditCartModal = this._modalService.show(
    //                     ViewOrderComponent,
    //                     {
    //                         class: 'modal-lg',
    //                         initialState: {
    //                             id: id,
    //                         }
    //                     }
    //                 );
    //             }
    //             createOrEditCartModal.content.onSave.subscribe(() => {
    //                 this.refresh();
    //             });
    // }


}
