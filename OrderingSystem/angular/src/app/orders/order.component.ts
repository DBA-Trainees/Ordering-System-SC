import { Component, Injector, Output, OnInit, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';
import { 
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import { 
    OrderDto,
    CreateOrderDto,
    OrderServiceProxy,
    OrderDtoPagedResultDto,
    CartDtoPagedResultDto,
    FoodDto,
    FoodDtoPagedResultDto,
    FoodServiceProxy,
    CartServiceProxy,
    CartDto,
    CustomerDto
} from '@shared/service-proxies/service-proxies';
import { ViewOrderComponent } from './view-order/view-order.component';

class PagedOrderRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

enum setFoodSize {
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
    cart = new CartDto();
    order = new OrderDto;
    orders: OrderDto[] = [];
    food = new FoodDto();
    foods: FoodDto[] = [];
    customer = new CustomerDto();
    customers: CustomerDto[] = [];
    foodId: number = null;
    selectCartId: number = null;
    keyword = '';
    isActive: boolean | null;
    fixedSize: string;
    foodProportions = [
      setFoodSize.Small,
      setFoodSize.Medium,
      setFoodSize.Large
   ]

   @Output() onSave = new EventEmitter<any>();
  

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        private _foodServiceProxy: FoodServiceProxy,
        private _cartServiceProxy: CartServiceProxy,
        private router: Router
    ) {
        super(injector);
    }


    protected list(
        request: PagedOrderRequestDto,
        pageNumber: number,
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;
    
        this._foodServiceProxy
          .getFoodWithCategoriesAndType(
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
          .subscribe((result: FoodDtoPagedResultDto) => {
            this.foods = result.items;
            this.showPaging(result, pageNumber);
          });
      }

      protected delete(order: OrderDto): void {
        abp.message.confirm(
          this.l('UserDeleteWarningMessage', order.cartId),
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
      this.cart.foodId = foodId;
      this.cart.customerId = this.customer.id;
      this.cart.size = this.fixedSize;
      

      if(this.id > 0) {
        this._cartServiceProxy.update(this.cart).subscribe(
          () => {
            this.notify.info(this.l('SavedSuccessfully'));
            this.onSave.emit();
          },
          () => {
            this.saving = false;
          }
        );
      } else {
        this._cartServiceProxy.create(this.cart).subscribe(
          () => {
            this.notify.info(this.l('AddedToCart'));
            this.onSave.emit();
          },
          () => {
            this.saving = false;
          }
        )
      }
    }

}