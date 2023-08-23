using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace OrderingSystem.Migrations
{
    /// <inheritdoc />
    public partial class Removed_And_Added_DateTime_And_Amount_in_Cart_and_Food_Table : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Ordered",
                table: "Carts",
                newName: "DateTimeAdded");

            migrationBuilder.AddColumn<double>(
                name: "Amount",
                table: "Carts",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Carts");

            migrationBuilder.RenameColumn(
                name: "DateTimeAdded",
                table: "Carts",
                newName: "Ordered");
        }
    }
}
