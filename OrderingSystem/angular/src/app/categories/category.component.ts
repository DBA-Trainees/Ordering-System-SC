import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    CategoryDto,
    CategoryDtoPagedResultDto,
    CategoryServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateEditCategoryModalComponent } from './create-edit-category/create-edit-category-modal.component';

class PagedCategoriesRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './category.component.html',
    animations: [appModuleAnimation()]
})

export class CategoriesComponent extends PagedListingComponentBase<CategoryDto>{
    categories: CategoryDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _categoryServiceProxy: CategoryServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector)
    }

    protected list(
        request: PagedCategoriesRequestDto,
        pageNumber: number,
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._categoryServiceProxy
            .getAll(
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
            .subscribe((result: CategoryDtoPagedResultDto) => {
                this.categories = result.items;
                this.showPaging(result, pageNumber);
            });
    }
   /*  protected delete(category: CategoryDto): void {
        abp.message.confirm(
            this.l('CategoryDeleteWarningMessage', category.name),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._categoryServiceProxy.delete(category.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        )
    }; */

    delete(category: CategoryDto): void {
        abp.message.confirm(
          this.l('The following records of this will be permanently erased.', category.name),
          undefined,
          (result: boolean) => {
            if (result) {
              this._categoryServiceProxy
                .delete(category.id)
                .pipe(
                  finalize(() => {
                    abp.notify.success(this.l('SuccessfullyDeleted'));
                    this.refresh();
                  })
                )
                .subscribe(() => {});
            }
          }
        );
      }

    createCategory(): void {
        this.showCreateOrEditCategoryModal();
    }

    editCategory(id): void {
        this.showCreateOrEditCategoryModal(id);
    }

    private showCreateOrEditCategoryModal(id?: number): void {
        let createOrEditCategoryModal: BsModalRef;
        if (!id) {
            createOrEditCategoryModal = this._modalService.show(
                CreateEditCategoryModalComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditCategoryModal = this._modalService.show(
                CreateEditCategoryModalComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    }
                }
            );
        }

        createOrEditCategoryModal.content.onSave.subscribe(() => {
            this.refresh();
        });
    }
}