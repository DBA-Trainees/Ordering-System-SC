// import { Component, Injector } from '@angular/core';
// import { finalize } from 'rxjs/operators';
// import { appModuleAnimation } from '@shared/animations/routerTransition';
// import {
//     PagedListingComponentBase,
//     PagedRequestDto
//   } from 'shared/paged-listing-component-base';
// import { CartDto, CartServiceProxy, CartDtoPagedResultDto } from '@shared/service-proxies/service-proxies';

//   class PagedCartsRequestDto extends PagedRequestDto {
//     keyword: string;
//     isActive: boolean | null;
//   }

//   @Component({
//     templateUrl: './cart.component.html',
//     animations: [appModuleAnimation()]
//   })

//   export class CartsComponent extends PagedListingComponentBase<CartDto>{
//     carts: CartDto[] = [];
//     keyword = '';
//     isActive: boolean | null;

//     constructor(
//         injector: Injector,
//         private _cartServiceProxy: CartServiceProxy
//     ) {
//         super(injector);
//     }

//     protected list(
//         request: PagedCartsRequestDto, 
//         pageNumber: number, 
//         finishedCallback: Function): void {
//         request.keyword = this.keyword;
//         request.isActive = this.isActive;

//         this._cartServiceProxy
//             .getAllFoodandCustomers(
//                 request.keyword,
//                 request.isActive,
//                 request.skipCount,
//                 request.maxResultCount
//             )
//             .pipe(
//                 finalize(() => {
//                     finishedCallback();
//                 })
//             )
//             .subscribe((result: CartDtoPagedResultDto) => {
//                 this.carts = result.items;
//                 this.showPaging(result, pageNumber);
//             });
//     }

//     protected delete(cart: CartDto): void {
//         abp.message.confirm(
//             this.l('UserDeleteWarningMessage', cart),
//             undefined,
//             (result: boolean) => {
//                 if (result) {
//                     this._cartServiceProxy.delete(cart.id).subscribe(() => {
//                         abp.notify.success(this.l('SuccessfullyDeleted'));
//                         this.refresh();
//                     });
//                 }
//             }
//         )
//     }
//   }
