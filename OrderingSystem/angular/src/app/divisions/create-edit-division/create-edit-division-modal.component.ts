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
    DivisionServiceProxy,
    DivisionDto
} from '@shared/service-proxies/service-proxies';
import { appModuleAnimation } from '@shared/animations/routerTransition';

@Component({
    templateUrl: 'create-edit-division-modal.component.html',
    animations: [appModuleAnimation()]
})


export class CreateEditDivisionModalComponent extends AppComponentBase
    implements OnInit {
    saving = false;
    division = new DivisionDto();
    id: number = 0;

    @Output() onSave = new EventEmitter<any>();

    constructor(
        injector: Injector,
        private _divisionServiceProxy: DivisionServiceProxy,
        public bsModalRef: BsModalRef
    ) {
        super(injector);
    }
    ngOnInit() {
        if(this.id){
            this._divisionServiceProxy.get(this.id).subscribe((res) => {
                this.division = res;
            });
        }
    }

    saveDivision(): void {
        this.saving = true;

        if(this.id !==0){
            this._divisionServiceProxy.update(this.division).subscribe(
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
            this._divisionServiceProxy.create(this.division).subscribe(
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