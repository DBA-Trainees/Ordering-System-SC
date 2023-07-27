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
    FoodDto,
    CategoryDto,
    TypeDto,
    FoodServiceProxy,
    CategoryServiceProxy,
    TypeServiceProxy
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-food-modal.component.html'
})


export class CreateEditFoodModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    food: FoodDto = new FoodDto();
    categories: CategoryDto[] = [];
    types: TypeDto[] = [];
    id: number = 0;
    selectCategoryId: number = null;
    selectTypeId: number = null;
    imageName: File;
    img: string;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _foodServiceProxy: FoodServiceProxy,
        private _categoryServiceProxy: CategoryServiceProxy,
        private _typeServiceProxy: TypeServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }

    ngOnInit() {
        if(this.id){
            this._foodServiceProxy.get(this.id).subscribe((res) => {
                this.food = res;
                this.food.name = res.name;
                this.selectCategoryId = this.food.categoryId;
                this.selectTypeId = this.food.typeId;
            });
        }
        this._categoryServiceProxy.getAllCategories().subscribe((res) => {
            this.categories = res;
        });
        this._typeServiceProxy.getAllTypes().subscribe((res) => {
            this.types = res;
        });
    }

    imageSelected(file) {
        this.imageName = file.target.files[0];
        console.log(this.imageName.name);
        this.img = this.imageName.name
    }


    saveFood(): void {
        this.saving = true;
        this.food.categoryId = this.selectCategoryId;
        this.food.typeId = this.selectTypeId;

        if(this.id !==0){
            this._foodServiceProxy.update(this.food).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            );
        }else{
            this._foodServiceProxy.create(this.food).subscribe(
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