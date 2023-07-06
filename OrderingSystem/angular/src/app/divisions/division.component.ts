import { Component, Injector, OnInit } from '@angular/core';
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
import { CreateDivisionModalComponent } from './create-division/create-division-modal.component';
import { EditDivisionModalComponent } from './edit-division/edit-division-modal.component';

class PagedDivisionsRequestDto extends PagedRequestDto {
  keyword: string;
  isActive: boolean | null;
}

@Component({
  selector: 'division-component',
  templateUrl: './division.component.html',
  animations: [appModuleAnimation()]
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
    super(injector)
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
      this.l('UserDeleteWarningMessage', division.name),
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

  create(): void {
    this.showCreateOrEditDivisionModal();
  }

  edit(id): void {
    this.showCreateOrEditDivisionModal(id);
  }

  private showCreateOrEditDivisionModal(id?: number): void {
    let createOrEditDivisionModal: BsModalRef;
    if (!id) {
      createOrEditDivisionModal = this._modalService.show(
        CreateDivisionModalComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditDivisionModal = this._modalService.show(
        EditDivisionModalComponent,
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