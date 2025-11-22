"use client"

import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { useRouter } from 'next/navigation'
import { Badge } from "@/components/ui/badge"
type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  sku: string;
  category: string;
  brand: string;
  weight: number;
  dimensions: string;
  image_urls: string | null;
  promo_codes: string | null;
  created_at: string;
  updated_at: string;
};




export const getColumns = (router: ReturnType<typeof useRouter>): ColumnDef<Product>[] => ([
  {
    accessorKey: "sku",
    header: "SKU",
    enableSorting: true,
    filterFn: (row, columnId, filterValue) => {
      const sku = row.original.sku?.toLowerCase() ?? "";
      return sku.includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm text-muted-foreground">
        {row.original.sku}
      </div>
    ),
  },

  {
    accessorKey: "name",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() =>
          column.toggleSorting(column.getIsSorted() === "asc")
        }
      >
        Product Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    enableSorting: true,
    filterFn: (row, columnId, filterValue) => {
      const name = row.original.name?.toLowerCase() ?? "";
      return name.includes(filterValue.toLowerCase());
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">
          {row.original.name || "Unnamed Product"}
        </span>
        <span className="text-xs text-muted-foreground">
          {row.original.category}
        </span>
      </div>
    ),
  },

  {
    accessorKey: "stock_quantity",
    header: "Stock",
    cell: ({ row }) => {
      const quantity = row.original.stock_quantity;
      const isLow = quantity <= 10;

      return (
        <span
          className={`text-sm font-medium ${
            isLow ? "text-red-500 font-semibold" : "text-foreground"
          }`}
        >
          {quantity}
        </span>
      );
    },
  },

  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const price = row.original.price;

      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EGP",
      }).format(price);

      return (
        <Badge variant="outline" className="text-sm font-medium">
          {formatted}
        </Badge>
      );
    },
  },

  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      // const router = useRouter();
      // const product = row.original;

      return (
        <Button
          variant="secondary"
          size="sm"
          className="h-8"
          onClick={() => router.push(`/product_details`)}
        >
          View
        </Button>
      );
    },
  },
])
export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [products, setProducts] = React.useState<Product[]>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const router = useRouter()

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setIsLoading] = React.useState(true);
      const [isAdmin, setIsAdmin] = React.useState(false); // ✅ Track admin status
    // ✅ Fetch admin status
    React.useEffect(() => {
      async function checkAdmin() {
        try {
          const res = await fetch("/api/admin/status");
          const data = await res.json();
          setIsAdmin(data.isAdmin);
        } catch {
          setIsAdmin(false);
        }
      }
      checkAdmin();
    }, []);
  React.useEffect(() => {
    fetchProducts();
  }, []);

  console.log(products)

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
     
      const res=await fetch(`/api/products`)

      if(!res.ok){
        throw ("error fetching products")
      }
      const data=await res.json();
   
      
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch products:", error);
      setIsLoading(false);
    }
  };


  console.log(products)
  const table = useReactTable({
    data: products,
  columns: getColumns(router),
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 dark:bg-black">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
            </div>
            <p className="text-gray-500 mt-4">Loading ...</p>
          </div>
        </div>
      </div>
    );
  }



      if(!isAdmin){
    return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      <p>Only visible to authenticated admins.</p>
    </div>
  );
  }

  return (


    <div className="w-full p-6 space-y-6 bg-white rounded-lg">
      {/* Header with filters and controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Customer Filter */}
          <div className="flex-1">
            <Input
              placeholder="Filter by Name..."
              value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Filter by Product sku..."
              value={(table.getColumn("sku")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("sku")?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
          </div>


          {/* Status Filter */}
          {/* <div className="flex-1">
            <select
              value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("status")?.setFilterValue(
                  event.target.value === "all" ? "" : event.target.value
                )
              }
              className="flex h-10 w-full max-w-xs items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div> */}

          {/* Column Visibility Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  )
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-md border shadow-sm">
        <Table>
          <TableHeader className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="py-3 font-medium">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
    colSpan={table.getAllLeafColumns().length}
                  className="h-24 text-center py-4"
                >
                  <div className="flex flex-col items-center justify-center py-6">
                    <p className="text-gray-500 text-lg font-medium">No orders found</p>
                    <p className="text-gray-400 text-sm mt-1">
                      Try adjusting your search or filter to find what you are looking for.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination and Selection Info */}
      <div className="flex flex-col gap-4 items-start justify-between py-4 md:flex-row md:items-center">
        <div className="text-muted-foreground text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>

        <div className="flex items-center space-x-2 self-stretch md:self-auto">
          <div className="text-sm text-gray-600 whitespace-nowrap mr-2">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
