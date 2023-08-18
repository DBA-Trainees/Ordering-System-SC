import {
    Component,
    OnInit,
    Injector,
    EventEmitter,
    Output
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import {
    OrderDto,
    FoodDto,
    OrderServiceProxy,
    FoodServiceProxy,
    CartServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-view-order-modal.component.html'
})


export class CreateEditViewOrderModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    order = new OrderDto;
    food: FoodDto[] = [];
    id: number;
    selectFoodId: number = null;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _orderServiceProxy: OrderServiceProxy,
        private _foodServiceProxy: FoodServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit() {
        if(this.id){
            this._orderServiceProxy.get(this.id).subscribe((res) => {
                this.order = res;
                this.order.size = res.size;
                this.selectFoodId = this.order.foodId;
            });
        }
        this._foodServiceProxy.getAllFoods().subscribe((res) => {
            this.food = res;
        });
    }


    saveOrder(): void {
        this.saving = true;
        this.order.foodId = this.selectFoodId;

        if(this.id > 0){
            this._orderServiceProxy.update(this.order).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
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
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            );
        }       
    }
}