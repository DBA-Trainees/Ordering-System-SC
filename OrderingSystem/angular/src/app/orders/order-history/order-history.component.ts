import { Component, Input, OnInit } from '@angular/core';
import { CartDto, CustomerDto, CartServiceProxy, CustomerServiceProxy, UserDto, UserServiceProxy, FoodDto } from "@shared/service-proxies/service-proxies";


@Component({
    templateUrl: './order-history.component.html',
    styleUrls: ['./order-history.component.css']
})

export class OrderHistoryComponent implements OnInit {
    id: number;
    saving = false;
    cart: CartDto[] = [];
    customer: CustomerDto[] = [];
    customers: CustomerDto;
    food: FoodDto[] = [];
    // customerId: string;



    ngOnInit(): void {
    }

    orderHistory(cart: CartDto): void {
        this.saving = true;
        this.customers.id = this.customers.id;
        this.customers.name = this.customers.name;
    }
}