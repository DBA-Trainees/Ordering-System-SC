import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AppRouteGuard } from '@shared/auth/auth-route-guard';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UsersComponent } from './users/users.component';
import { TenantsComponent } from './tenants/tenants.component';
import { RolesComponent } from 'app/roles/roles.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { DivisionsComponent } from './divisions/division.component';
import { CustomersComponent } from './customers/customer.component';   
import { CategoriesComponent } from './categories/category.component';
import { FoodsComponent } from './foods/food.component'; 
import { TypesComponent } from './types/type.component';
import { OrdersComponent } from './orders/order.component';
import { CheckOrderComponent } from './orders/check-order/check-order.component';
import { ViewDetailsComponent } from './orders/view-details/view-details-dialog.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PurchaseHistoryComponent } from './foods/purchase-history/purchase-history.component';
import { OrderHistoryComponent } from './orders/order-history/order-history.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: AppComponent,
                children: [
                    { path: 'home', component: HomeComponent,  canActivate: [AppRouteGuard] },
                    { path: 'users', component: UsersComponent, data: { permission: 'Pages.Users' }, canActivate: [AppRouteGuard] },
                    { path: 'roles', component: RolesComponent, data: { permission: 'Pages.Roles' }, canActivate: [AppRouteGuard] },
                    { path: 'tenants', component: TenantsComponent, data: { permission: 'Pages.Tenants' }, canActivate: [AppRouteGuard] },
                    { path: 'about', component: AboutComponent, canActivate: [AppRouteGuard] },
                    { path: 'update-password', component: ChangePasswordComponent, canActivate: [AppRouteGuard] },
                    { path: 'divisions', component: DivisionsComponent, data:{ permission: 'Pages.Divisions' },canActivate: [AppRouteGuard] },
                    { path: 'customers', component: CustomersComponent, data:{ permission: 'Pages.Customers' }, canActivate: [AppRouteGuard] },
                    { path: 'categories', component: CategoriesComponent, data:{ permission: 'Pages.Categories' }, canActivate: [AppRouteGuard] },
                    { path: 'foods', component: FoodsComponent, data:{ permission: 'Pages.Foods' }, canActivate: [AppRouteGuard] },
                    { path: 'types', component: TypesComponent, data:{ permission: 'Pages.Types' }, canActivate: [AppRouteGuard] },
                    { path: 'orders', component: OrdersComponent, data:{ permission: 'Pages.Orders' }, canActivate: [AppRouteGuard] },
                    { path: 'check-order', component: CheckOrderComponent, data:{ permission: 'Pages.Carts' }, canActivate: [AppRouteGuard] },
                    { path: 'view-details', component: ViewDetailsComponent, data:{ permission: 'Pages.Orders' }, canActivate: [AppRouteGuard] },
                    { path: 'dashboard', component: DashboardComponent, canActivate: [AppRouteGuard] },
                    { path: 'purchase-history', component: PurchaseHistoryComponent, data: { permission: 'Pages.Foods' }, canActivate: [AppRouteGuard] },
                    { path: 'order-history', component: OrderHistoryComponent, data: { permission: 'Pages.Carts' }, canActivate: [AppRouteGuard] }
                ]
            }
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
