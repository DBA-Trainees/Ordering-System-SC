import {
  Component,
  Injector,
  Output,
  OnInit,
  EventEmitter,
} from "@angular/core";
import { finalize } from "rxjs/operators";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import { Router } from "@angular/router";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "shared/paged-listing-component-base";
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
  CustomerDto,
} from "@shared/service-proxies/service-proxies";
import { CheckOrderComponent } from "./check-order/check-order.component";
import * as moment from "moment";

class PagedOrderRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

enum setFoodSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

@Component({
  templateUrl: "order.component.html",
  animations: [appModuleAnimation()],
  styleUrls: ["./order.component.css"],
})
export class OrdersComponent extends PagedListingComponentBase<OrderDto> {
  id: number;
  saving = false;
  cart = new CartDto();
  order = new OrderDto();
  orders: OrderDto[] = [];
  food = new FoodDto();
  foods: FoodDto[] = [];
  customer = new CustomerDto();
  customers: CustomerDto[] = [];
  foodId: number = null;
  selectCartId: number = null;
  keyword = "";
  isActive: boolean | null;
  fixedSize: string;
  qty: number = 1;
  notes: string;
  foodProportions = [setFoodSize.Small, setFoodSize.Medium, setFoodSize.Large];
  dateToday: Date = new Date();



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
    finishedCallback: Function
  ): void {
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
      this.l("DeleteWarningMessage", order.cartId),
      undefined,
      (result: boolean) => {
        if (result) {
          this._orderServiceProxy.delete(order.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  updateCart(foodId: number): void{
    foodId = this.food.id;
    this._cartServiceProxy.update(this.cart).subscribe(() =>{
      this.notify.info(this.l("SavedSuccessfully"));
        this.onSave.emit();
      },
      () => {
        this.saving = false;
    })
  }

  foodIdSave(food: FoodDto): void {
    sessionStorage.setItem('id', food.id.toString());
  }

  addToCart(foodId: number): void {
    this.saving = true;
    this.cart.foodId = foodId;
    this.cart.customerId = this.customer.id;
    this.cart.size = this.fixedSize;
    this.cart.quantity = this.qty;
    this.cart.notes = this.notes;
    this.cart.dateTimeAdded = moment(this.dateToday);
    this.cart.amount = this.qty * this.food.price;

    this._cartServiceProxy.updateExistingCartTable(this.cart).subscribe(
      () => {
        this.notify.info(this.l("SavedSuccessfully"));
        this.onSave.emit();
        this.router.navigate(["./app/orders"]);
      },
      () => {
        this.saving = false;
      }
    );
  }
}
