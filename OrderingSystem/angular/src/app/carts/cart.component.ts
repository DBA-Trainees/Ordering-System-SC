import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Router } from '@angular/router';
import {
    PagedListingComponentBase,
    PagedRequestDto
  } from 'shared/paged-listing-component-base';
import { CartDto, CartServiceProxy, CartDtoPagedResultDto } from '@shared/service-proxies/service-proxies';
import { CreateEditCartModalComponent } from './create-edit-cart/create-edit-cart-modal.component';

  class PagedCartsRequestDto extends PagedRequestDto {
    keyword: string;
    isActive: boolean | null;
  }

  @Component({
    templateUrl: './cart.component.html',
    animations: [appModuleAnimation()]
  })

  export class CartsComponent extends PagedListingComponentBase<CartDto>{
    carts: CartDto[] = [];
    keyword = '';
    isActive: boolean | null;

    constructor(
        injector: Injector,
        private _cartServiceProxy: CartServiceProxy,
        private _modalService: BsModalService
    ) {
        super(injector);
    }

    protected list(
        request: PagedCartsRequestDto, 
        pageNumber: number, 
        finishedCallback: Function): void {
        request.keyword = this.keyword;
        request.isActive = this.isActive;

        this._cartServiceProxy
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
            .subscribe((result: CartDtoPagedResultDto) => {
                this.carts = result.items;
                this.showPaging(result, pageNumber);
            });
    }

    protected delete(cart: CartDto): void {
        abp.message.confirm(
            this.l('UserDeleteWarningMessage', cart),
            undefined,
            (result: boolean) => {
                if (result) {
                    this._cartServiceProxy.delete(cart.id).subscribe(() => {
                        abp.notify.success(this.l('SuccessfullyDeleted'));
                        this.refresh();
                    });
                }
            }
        )
    }

    createCart(): void {
        this.showCreateOrEditCartModal();
    }

    editCart(id): void {
        this.showCreateOrEditCartModal(id);
    }

    private showCreateOrEditCartModal(id?: number): void {
        let createOrEditCartModal: BsModalRef;
        if(!id) {
            createOrEditCartModal = this._modalService.show(
                CreateEditCartModalComponent,
                {
                    class: 'modal-lg',
                }
            );
        } else {
            createOrEditCartModal = this._modalService.show(
                CreateEditCartModalComponent,
                {
                    class: 'modal-lg',
                    initialState: {
                        id: id,
                    }
                }
            );
        }
        createOrEditCartModal.content.onSave.subscribe(() => {
            this.refresh();
        });
    }
  }
