import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from 'shared/paged-listing-component-base';
import {
  DivisionDto,
  DivisionDtoPagedResultDto,
  DivisionServiceProxy
} from '@shared/service-proxies/service-proxies';
import {CreateEditDivisionModalComponent } from './create-edit-division/create-edit-division-modal.component';

class PagedDivisionsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  templateUrl: './division.component.html',
  animations: [appModuleAnimation()],
  styleUrls: ["./division.component.css"]
})


export class DivisionsComponent extends PagedListingComponentBase<DivisionDto>{
  divisions: DivisionDto[] = [];
  keyword = '';
  isActive: boolean | null;
  advancedFiltersVisible = false;


  constructor(
    injector: Injector,
    private _divisionServiceProxy: DivisionServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  protected list(
    request: PagedDivisionsRequestDto,
    pageNumber: number,
    finishedCallback: Function): void {
    request.keyword = this.keyword;
    request.isActive = this.isActive;

    this._divisionServiceProxy
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
      .subscribe((result: DivisionDtoPagedResultDto) => {
        this.divisions = result.items;
        this.showPaging(result, pageNumber);
      });
  }
  
  protected delete(division: DivisionDto): void {
    abp.message.confirm(
      this.l('DeleteWarningMessage', division.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._divisionServiceProxy.delete(division.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }

  createDivision(): void {
    this.showCreateOrEditDivisionModal();
  }

  editDivision(id): void {
    this.showCreateOrEditDivisionModal(id);
  }

  private showCreateOrEditDivisionModal(id?: number): void {
    let createOrEditDivisionModal: BsModalRef;
    if (!id) {
      createOrEditDivisionModal = this._modalService.show(
        CreateEditDivisionModalComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditDivisionModal = this._modalService.show(
        CreateEditDivisionModalComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          }
        }
      );
    }

    createOrEditDivisionModal.content.onSave.subscribe(() => {
      this.refresh();
    });
  }

}