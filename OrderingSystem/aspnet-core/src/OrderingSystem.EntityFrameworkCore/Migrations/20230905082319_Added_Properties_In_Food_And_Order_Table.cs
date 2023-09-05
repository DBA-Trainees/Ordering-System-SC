using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class Added_Properties_In_Food_And_Order_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Foods_FoodId",
                table: "Orders");

            migrationBuilder.DropIndex(
                name: "IX_Orders_FoodId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "FoodId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "Quantity",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Size",
                table: "Orders",
                newName: "Notes");

            migrationBuilder.AddColumn<DateTime>(
                name: "Ordered",
                table: "Orders",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<double>(
                name: "TotalAmount",
                table: "Orders",
                type: "float",
                nullable: false,
                defaultValue: 0.0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Ordered",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "TotalAmount",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "Notes",
                table: "Orders",
                newName: "Size");

            migrationBuilder.AddColumn<int>(
                name: "FoodId",
                table: "Orders",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Quantity",
                table: "Orders",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Orders_FoodId",
                table: "Orders",
                column: "FoodId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Foods_FoodId",
                table: "Orders",
                column: "FoodId",
                principalTable: "Foods",
                principalColumn: "Id");
        }
    }
}
