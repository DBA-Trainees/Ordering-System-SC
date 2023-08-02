import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceProxyModule } from '@shared/service-proxies/service-proxy.module';
import { SharedModule } from '@shared/shared.module';
import { HomeComponent } from '@app/home/home.component';
import { AboutComponent } from '@app/about/about.component';
import { DivisionsComponent } from './divisions/division.component';
import { CreateEditDivisionModalComponent } from './divisions/create-edit-division/create-edit-division-modal.component';
import { CustomersComponent } from './customers/customer.component';
import { CreateEditCustomerModalComponent } from './customers/create-edit-customer/create-edit-customer-modal.component';
import { CategoriesComponent } from './categories/category.component';
import { CreateEditCategoryModalComponent } from './categories/create-edit-category/create-edit-category-modal.component';
import { FoodsComponent } from './foods/food.component';
import { CreateEditFoodModalComponent } from './foods/create-edit-food/create-edit-food-modal.component';
import { TypesComponent } from './types/type.component';
import { CreateEditTypeModalComponent } from './types/create-edit-type/create-edit-type-modal.component';
import { OrdersComponent } from './orders/order.component';
import { CreateEditViewOrderModalComponent } from './orders/create-edit-view-order/create-edit-view-order-modal.component';

// tenants
import { TenantsComponent } from '@app/tenants/tenants.component';
import { CreateTenantDialogComponent } from './tenants/create-tenant/create-tenant-dialog.component';
import { EditTenantDialogComponent } from './tenants/edit-tenant/edit-tenant-dialog.component';
// roles
import { RolesComponent } from '@app/roles/roles.component';
import { CreateRoleDialogComponent } from './roles/create-role/create-role-dialog.component';
import { EditRoleDialogComponent } from './roles/edit-role/edit-role-dialog.component';
// users
import { UsersComponent } from '@app/users/users.component';
import { CreateUserDialogComponent } from '@app/users/create-user/create-user-dialog.component';
import { EditUserDialogComponent } from '@app/users/edit-user/edit-user-dialog.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { ResetPasswordDialogComponent } from './users/reset-password/reset-password.component';
// layout
import { HeaderComponent } from './layout/header.component';
import { HeaderLeftNavbarComponent } from './layout/header-left-navbar.component';
import { HeaderLanguageMenuComponent } from './layout/header-language-menu.component';
import { HeaderUserMenuComponent } from './layout/header-user-menu.component';
import { FooterComponent } from './layout/footer.component';
import { SidebarComponent } from './layout/sidebar.component';
import { SidebarLogoComponent } from './layout/sidebar-logo.component';
import { SidebarUserPanelComponent } from './layout/sidebar-user-panel.component';
import { SidebarMenuComponent } from './layout/sidebar-menu.component';
import { CategoryServiceProxy, CustomerServiceProxy, DivisionServiceProxy, FoodServiceProxy, TypeServiceProxy, OrderServiceProxy } from '@shared/service-proxies/service-proxies';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        AboutComponent,
        // tenants
        TenantsComponent,
        CreateTenantDialogComponent,
        EditTenantDialogComponent,
        // roles
        RolesComponent,
        CreateRoleDialogComponent,
        EditRoleDialogComponent,
        // users
        UsersComponent,
        CreateUserDialogComponent,
        EditUserDialogComponent,
        ChangePasswordComponent,
        ResetPasswordDialogComponent,
        // layout
        HeaderComponent,
        HeaderLeftNavbarComponent,
        HeaderLanguageMenuComponent,
        HeaderUserMenuComponent,
        FooterComponent,
        SidebarComponent,
        SidebarLogoComponent,
        SidebarUserPanelComponent,
        SidebarMenuComponent,
        // div
        DivisionsComponent,
        CreateEditDivisionModalComponent,
        CustomersComponent,
        CreateEditCustomerModalComponent,
        CategoriesComponent,
        CreateEditCategoryModalComponent,
        FoodsComponent,
        CreateEditFoodModalComponent,
        TypesComponent,
        CreateEditTypeModalComponent,
        OrdersComponent,
        CreateEditViewOrderModalComponent,
        
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpClientJsonpModule,
        ModalModule.forChild(),
        BsDropdownModule,
        CollapseModule,
        TabsModule,
        AppRoutingModule,
        ServiceProxyModule,
        SharedModule,
        NgxPaginationModule,
        
    ],
    providers: [
        DivisionServiceProxy,
        CustomerServiceProxy,
        CategoryServiceProxy,
        FoodServiceProxy,
        TypeServiceProxy,
        OrderServiceProxy
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule {}
