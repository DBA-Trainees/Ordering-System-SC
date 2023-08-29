// import {
//   Component,
//   OnInit,
//   Injector,
//   EventEmitter,
//   Output,
// } from "@angular/core";
// import { BsModalRef } from "ngx-bootstrap/modal";
// import { AppComponentBase } from '@shared/app-component-base';
// import {
//     CartServiceProxy,
//     CartDto
// } from '@shared/service-proxies/service-proxies';
// import { appModuleAnimation } from '@shared/animations/routerTransition';


// @Component({
//   templateUrl: "create-edit-cart-modal.component.html",
//   animations: [appModuleAnimation()]
// })

// export class CreateEditCartModalComponent extends AppComponentBase
//   implements OnInit {
//   saving = false;
//   cart = new CartDto();
//   id: number = 0;

//   @Output() onSave = new EventEmitter<any>();


//   constructor(
//     injector: Injector,
//     private _cartServiceProxy: CartServiceProxy,
//     public bsModalRef: BsModalRef
//   ) {
//     super(injector);
//   }

//   ngOnInit() {
//     if(this.id){
//         this._cartServiceProxy.get(this.id).subscribe((res) => {
//             this.cart = res;
//         });
//     }
//   }

//   saveCart(): void {
//     this.saving = true;

//     if(this.id !==0){
//         this._cartServiceProxy.update(this.cart).subscribe(
//             () => {
//                 this.notify.info(this.l('SavedSuccessfully'));
//                 this.bsModalRef.hide();
//                 this.onSave.emit();
//             },
//             () => {
//                 this.saving = false;
//             }
//         );
//     } else {
//         this._cartServiceProxy.create(this.cart).subscribe(
//             () => {
//                 this.notify.info(this.l('SavedSuccessfully'));
//                 this.bsModalRef.hide();
//                 this.onSave.emit();
//             },
//             () => {
//                 this.saving = false;
//             }
//         );
//     }
//   }
// }

