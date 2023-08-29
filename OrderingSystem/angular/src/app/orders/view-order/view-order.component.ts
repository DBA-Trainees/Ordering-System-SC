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
    OrderServiceProxy,
    CartDto,
    CartServiceProxy,
    CartDtoPagedResultDto,
    FoodDto
} from '@shared/service-proxies/service-proxies';
// import { ViewOrderComponent } from './view-order/view-order.component';

class PagedCartsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}


@Component({
    templateUrl: 'view-order.component.html',
    styleUrls: ["./view-order.component.css"]
})


export class ViewOrderComponent extends PagedListingComponentBase<OrderDto>{
    saving = false;
    id: number;
    order = new OrderDto();
    orders: OrderDto[] = [];
    carts: CartDto[] = [];
    food = new FoodDto();
    keyword = '';
    isActive: boolean | null;
    selectedCartId: number = null;


    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
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
            .getAllFoodandCustomers(
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

    protected delete(order: OrderDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', order),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._cartServiceProxy.delete(order.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        )
    }

    checkOutCart(): void {
        this.saving = true;
        this.order.cartId = this.selectedCartId;

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
}

