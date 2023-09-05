import {
    Component,
    Injector,
    Output,
    OnInit,
    EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import {
    OrderDto,
    OrderServiceProxy,
    CartDto,
    CartServiceProxy,
    CartDtoPagedResultDto,
    FoodDto,
    FoodServiceProxy
} from '@shared/service-proxies/service-proxies';

enum foodSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}


@Component({
    templateUrl: 'view-order.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ["./view-order.component.css"]
})


export class ViewOrderComponent extends AppComponentBase implements OnInit {
    saving = false;
    id: number;
    order = new OrderDto();
    food = new FoodDto();
    selectedCartId: number = null;
    setSize: string;
    notes: string;
    sum: number = 1;
    cost: number;
    foodCateg = [
        foodSize.Small,
        foodSize.Medium,
        foodSize.Large
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


    ngOnInit(): void {
        
    }

    protected delete(order: OrderDto): void {
        abp.message.confirm(
          this.l('UserDeleteWarningMessage', order.cartId),
          undefined,
          (result: boolean) => {
            if (result) {
              this._orderServiceProxy.delete(order.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
              });
            }
          }
        );
      }

    
    backToOrders() : void {
        this.router.navigate(["./app/orders"]);
    }
    

    checkOutCart(cartId: number): void {
        this.saving = true;
        this.order.cartId = this.selectedCartId;
        this.order.cart.quantity = this.sum;
        this.order.cart.size = this.setSize;
        this.order.totalAmount = this.cost;
        this.order.notes = this.notes;

        if(this.id > 0) {
            this._orderServiceProxy.update(this.order).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.onSave.emit();
                    this.router.navigate(["./app/orders"]);
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
                    this.router.navigate(["./app/orders"]);
                },
                () => {
                    this.saving = false;
                }
            )
        }
    }
}

