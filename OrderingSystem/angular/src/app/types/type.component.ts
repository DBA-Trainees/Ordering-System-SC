import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
    PagedListingComponentBase,
    PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
    TypeDto,
    TypeDtoPagedResultDto,
    TypeServiceProxy
} from '@shared/service-proxies/service-proxies';
import { CreateEditTypeModalComponent } from './create-edit-type/create-edit-type-modal.component';

class PagedTypeRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
}

@Component({
    templateUrl: './type.component.html',
    animations: [appModuleAnimation()],
    styleUrls: ["./type.component.css"]
})

export class TypesComponent extends PagedListingComponentBase<TypeDto>{
    types: TypeDto[] = [];
    keyword = '';
    isActive: boolean | null;
    advancedFiltersVisible = false;

    constructor(
        injector: Injector,
        private _typeServiceProxy: TypeServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector)
    }

    protected list(
        request: PagedTypeRequestDto,
        pageNumber: number,
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._typeServiceProxy
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
            .subscribe((result: TypeDtoPagedResultDto) => {
                this.types = result.items;
                this.showPaging(result, pageNumber);
            });
    }
    protected delete(type: TypeDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', type.name),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._typeServiceProxy.delete(type.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        )
    };

    createType(): void {
        this.showCreateOrEditTypeModal();
    }

    editType(id): void {
        this.showCreateOrEditTypeModal(id);
    }

    private showCreateOrEditTypeModal(id?: number): void {
        let createOrEditTypeModal: BsModalRef;
        if (!id) {
            createOrEditTypeModal = this._modalService.show(
                CreateEditTypeModalComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditTypeModal = this._modalService.show(
                CreateEditTypeModalComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    }
                }
            );
        }

        createOrEditTypeModal.content.onSave.subscribe(() => {
            this.refresh();
        });
    }
}