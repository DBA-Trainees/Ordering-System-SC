import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { 
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import { 
    FoodDto,
    FoodDtoPagedResultDto,
    FoodServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateEditFoodModalComponent } from './create-edit-food/create-edit-food-modal.component';
import { CheckOrderComponent } from '@app/orders/check-order/check-order.component';

class PagedFoodsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: 'food.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ["./food.component.css"]
})

export class FoodsComponent extends PagedListingComponentBase<FoodDto>{
    foods: FoodDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _foodServiceProxy: FoodServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector)
    }

    protected list(
        request: PagedFoodsRequestDto,
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
      protected delete(food: FoodDto): void {
        abp.message.confirm(
          this.l('DeleteWarningMessage', food.name),
          undefined,
          (result: boolean) => {
            if (result) {
              this._foodServiceProxy.delete(food.id).subscribe(() => {
                abp.notify.success(this.l('SuccessfullyDeleted'));
                this.refresh();
              });
            }
          }
        );
      }
    
      createFood(): void {
        this.showCreateOrEditFoodModal();
      }
    
      editFood(id): void {
        this.showCreateOrEditFoodModal(id);
      }
    
      private showCreateOrEditFoodModal(id?: number): void {
        let createOrEditFoodModal: BsModalRef;
        if (!id) {
          createOrEditFoodModal = this._modalService.show(
            CreateEditFoodModalComponent,
            {
              class: 'modal-lg',
            }
          );
        } else {
          createOrEditFoodModal = this._modalService.show(
            CreateEditFoodModalComponent,
            {
              class: 'modal-lg',
              initialState: {
                id: id,
              }
            }
          );
        }
    
        createOrEditFoodModal.content.onSave.subscribe(() => {
          this.refresh();
        });
      }
}