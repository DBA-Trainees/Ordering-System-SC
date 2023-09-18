import { Component, Injector, Output, EventEmitter } from "@angular/core";
import { Router } from "@angular/router";
import { appModuleAnimation } from "@shared/animations/routerTransition";
import {
  OrderDto,
  OrderServiceProxy,
  CartServiceProxy,
  FoodDto,
  FoodServiceProxy,
  CartDto,
  OrderDtoPagedResultDto,
  CartDtoPagedResultDto,
  CreateOrderDto,
  CreateCartDto,
} from "@shared/service-proxies/service-proxies";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import { finalize } from "rxjs/operators";

class PagedCartRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

enum foodSize {
  Small = "Small",
  Medium = "Medium",
  Large = "Large",
}

@Component({
  templateUrl: "./check-order.component.html",
  animations: [appModuleAnimation()],
  styleUrls: ["./check-order.component.css"],
})
export class CheckOrderComponent extends PagedListingComponentBase<CartDto> {
  keyword = "";
  isActive: boolean | null;
  saving = false;
  id: number;
  cart = new CartDto();
  carts: CartDto[] = [];
  order: OrderDto[] = [];
  createOrder= new CreateOrderDto();
  orders = new OrderDto;
  food = new FoodDto();
  selectedCartId: number = null;
  setSize: string;
  notes: string;
  sum: number = 1;
  cost: number;
  foodCateg = [foodSize.Small, foodSize.Medium, foodSize.Large];
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
    request: PagedCartRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._cartServiceProxy
      .getCartsFromOrderList(
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
        this.refresh();
      });
  }

  protected delete(cart: CartDto): void {
    abp.message.confirm(
      this.l("DeleteWarningMessage", cart.food.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._cartServiceProxy.delete(cart.id).subscribe(() => {
            abp.notify.success(this.l("SuccessfullyDeleted"));
            this.refresh();
          });
        }
      }
    );
  }

  completeAmount(cart: CartDto[]) {
    return cart.reduce(
      (total, cart) => total + cart.amount,
      0
    );
  }

  backToOrders(): void {
    this.router.navigate(["./app/orders"]);
  }

  checkOutCart(createOrder: CreateCartDto): void {
    this.saving = true;
    this.createOrder.id = this.cart.id;

    this._orderServiceProxy.create(this.createOrder).subscribe(
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
