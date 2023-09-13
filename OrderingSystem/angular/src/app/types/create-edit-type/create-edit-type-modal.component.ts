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
    TypeServiceProxy,
    TypeDto
} from '@shared/service-proxies/service-proxies';

@Component({
    templateUrl: 'create-edit-type-modal.component.html'
})


export class CreateEditTypeModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    type = new TypeDto();
    id: number = 0;
    checkUpdate = false;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _typeServiceProxy: TypeServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit(): void {
         if(this.id){
            this.checkUpdate = true;
            this._typeServiceProxy.get(this.id).subscribe((res) => {
                this.type = res;
            });
        }
    }

    saveType(): void {
        this.saving = true;

        if(this.id != 0){
            this._typeServiceProxy.update(this.type).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                    this.checkUpdate = false;
                }
            );
        }else{
            this._typeServiceProxy.create(this.type).subscribe(
                () => {
                    this.notify.info(this.l('SavedSuccessfully'));
                    this.bsModalRef.hide();
                    this.onSave.emit();
                },
                () => {
                    this.saving = false;
                }
            )
        }
    }
}