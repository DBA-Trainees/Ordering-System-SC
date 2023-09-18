import { Component, Injector, OnInit } from "@angular/core";
import { AppComponentBase } from "@shared/app-component-base";
import {
  PagedListingComponentBase,
  PagedRequestDto,
} from "@shared/paged-listing-component-base";
import {
  OrderDto,
  OrderServiceProxy,
} from "@shared/service-proxies/service-proxies";
class PagedOrdersRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}
@Component({
  templateUrl: "purchase-history.component.html",
  styleUrls: ["./purchase-history.component.css"],
})
export class PurchaseHistoryComponent extends AppComponentBase implements OnInit{
  keyword: string = "";
  isActive: boolean | null;
  order = new OrderDto();
  orders: OrderDto[] = [];
  totalAmount: number = 0;

  constructor(
    injector: Injector, 
    private _orderService: OrderServiceProxy
    ) 
    
    {
    super(injector);
    }

    ngOnInit(): void {

    }

    totalSum(orders: OrderDto[]): number {
      return orders.reduce((total, order) => total + order.totalAmount, 0);
    }
}