import { Component, Injector, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { 
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import { 
    OrderDto,
    OrderServiceProxy,
    CartServiceProxy,
    OrderDtoPagedResultDto,
    FoodDto,
} from '@shared/service-proxies/service-proxies';
import { ViewOrderComponent } from './view-order/view-order.component';

class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

enum setFoodEnum {
  Small = 'Small',
  Medium = 'Medium',
  Large = 'Large'
}

@Component({
    templateUrl: 'order.component.html', 
    animations: [appModuleAnimation()],
    styleUrls: ["./order.component.css"]
})

export class OrdersComponent extends PagedListingComponentBase<OrderDto>{
    id: number;
    saving = false;
    cart = new OrderDto();
    orders: OrderDto[] = [];
    food = new FoodDto();
    foods: FoodDto[] = [];
    setFoodSizing: string;
    keyword = '';
    isActive: boolean | null;
    foodProportions = [
      setFoodEnum.Small,
      setFoodEnum.Medium,
      setFoodEnum.Large
   ]

   @Output() onSave = new EventEmitter<any>();
  

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        // private _cartServiceProxy: CartServiceProxy,
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
          .getCartsWithFood(
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
          this.l('UserDeleteWarningMessage', order),
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

    addToCart(foodId: number): void {
      this.saving = true;
      // this.cart.foodId = foodId;

      if(this.id > 0) {
        this._orderServiceProxy.update(this.cart).subscribe(
          () => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.onSave.emit();
          },
          () => {
            this.saving = false;
          }
        );
      } else {
        this._orderServiceProxy.create(this.cart).subscribe(
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