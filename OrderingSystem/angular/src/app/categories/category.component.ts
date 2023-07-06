import { Component, Injector, OnInit } from '@angular/core';
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

@Component({
    selector: 'category-component',
    templateUrl: 'category.component.html'
})

export class CategoriesComponent{}