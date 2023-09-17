import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { AppComponentBase } from '@shared/app-component-base';
import { OrderServiceProxy, FoodServiceProxy, OrderDto, FoodDto, CartServiceProxy, CartDto } from '@shared/service-proxies/service-proxies';
import * as moment from 'moment';

enum orderSize {
    Small = 'Small',
    Medium = 'Medium',
    Large = 'Large'
}

    
@Component({
  templateUrl: 'view-details-dialog.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ['view-details-dialog.component.css']
})
    

export class ViewDetailsComponent extends AppComponentBase implements OnInit {
    saving = false;
    order = new OrderDto;
    cart = new CartDto;
    food = new FoodDto;
    id: number;
    setOrderSize: string;
    setOrderQuantity: number = 1;
    setPrice: number;
    // setTotalPrice: number;
    keyNotes: string;
    foodProportions = [
        orderSize.Small,
        orderSize.Medium,
        orderSize.Large
    ];
    today: Date = new Date();
    
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
        if(parseInt(sessionStorage.getItem('id'))) {
            this._foodServiceProxy.get(parseInt(sessionStorage.getItem('id'))).subscribe((result) => {
                this.food = result;
            });
        }
        console.log(this.food.id);
     }

    addToCart(foodId : number): void {
        // this.setPrice = this.food.price * this.setOrderQuantity;

        this.saving = true;
        this.cart.foodId = foodId;
        this.cart.size = this.setOrderSize;
        this.cart.quantity = this.setOrderQuantity;
        this.cart.notes = this.keyNotes;
        this.cart.amount = this.setOrderQuantity * this.food.price;
        this.cart.dateTimeAdded = moment(this.today);

       
            this._cartServiceProxy.updateExistingCartTable(this.cart).subscribe(() => {
                this.notify.info(this.l('SavedSuccessfully'));
                this.onSave.emit();
                this.router.navigate(["./app/orders"]);
            },
                () => {
                this.saving = false;
                }
            );

    }
}