import { Component, Injector, OnInit, EventEmitter, Output } from '@angular/core';
import { AppComponentBase } from '@shared/app-component-base';
import { OrderServiceProxy, FoodServiceProxy, OrderDto, CreateOrderDto } from '@shared/service-proxies/service-proxies';

    
@Component({
  templateUrl: 'view-details-dialog.component.html'
})
    
export class ViewDetailsComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    order = new OrderDto;
    



    @Output() onSave = new EventEmitter<any>();


    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        private _foodServiceProxy: FoodServiceProxy
    ) {
        super(injector);
     }
    
    ngOnInit(): void {

     }

    saveDetails(): void {
        this.saving = true;

    }
}