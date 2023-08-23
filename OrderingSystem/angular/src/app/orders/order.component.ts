import { Component, Injector, Output, EventEmitter } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { 
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import { 
    FoodDto,
    OrderDto,
    OrderServiceProxy,
    FoodServiceProxy,
    FoodDtoPagedResultDto,
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
    cart = new OrderDto;
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
        private _foodServiceProxy: FoodServiceProxy,
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

      addFood(): void {
        this.showViewOrderModal();
      }
      
      saveToCart(id): void {
        this.showViewOrderModal(id);
        // this.saving = true;
        // this.cart.foodId = food;
      }

    private showViewOrderModal(id?: number): void {
      let showViewOrderModal: BsModalRef;
      if (!id) {
        showViewOrderModal = this._modalService.show(
          ViewOrderComponent,
          {
            class: 'modal-lg',
          }
        );
      } else {
        showViewOrderModal = this._modalService.show(
          ViewOrderComponent,
          {
            class: 'modal-lg',
            initialState: {
              id: id,
            }
          }
        );
      }
  
      showViewOrderModal.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
}