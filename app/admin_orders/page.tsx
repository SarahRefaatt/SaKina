// "use client"

// import * as React from "react"
// import {
//   ColumnDef,
//   ColumnFiltersState,
//   flexRender,
//   getCoreRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   SortingState,
//   useReactTable,
//   VisibilityState,
// } from "@tanstack/react-table"
// import { ChevronDown, Eye, MoreHorizontal } from "lucide-react"

// import { Button } from "@/components/ui/button"
// // import { Checkbox } from "@/components/ui/checkbox"
// import {
//   DropdownMenu,
//   DropdownMenuCheckboxItem,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Input } from "@/components/ui/input"
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table"

// import { useRouter } from 'next/navigation'
// import { Badge } from "@/components/ui/badge"
// import * as XLSX from "xlsx"
// // import { columns } from "../admin_products/page"

// interface FullOrder {
//   id: number;
//   customer_id: number | null;
//   customer_name: string;
//   customer_email: string;
//   customer_phone: string;
//   cart_id: number;
//   order_date: string; // ISO string (e.g., "2025-08-29T19:39:34.911814")
//   status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | string;
//   payment_method: 'credit_card' | 'paypal' | 'cash_on_delivery' | string;
//   payment_status: 'paid' | 'unpaid' | 'refunded' | string;
//   total_amount: number;
//   shipping_address: string;
//   billing_address: string;
//   shipping_city: string;
//   shipping_state: string;
//   shipping_postal_code: string;
//   shipping_country: string;
//   created_at: string; // ISO timestamp
//   updated_at: string; // ISO timestamp
// }




// export const getColumns = (router: ReturnType<typeof useRouter>): ColumnDef<FullOrder>[] => ([
//   {
//     accessorKey: "id",
//     header: "ORDER ID",
//     filterFn: (row, columnId, filterValue) => {
//       const id = row.original.id?.toString() || "";
//       return id.includes(filterValue.toString());
//     },
//     cell: ({ row }) => (
//       <div className="font-mono text-sm text-gray-700">{row.original.id}</div>
//     ),
//   },

//   {
//     accessorKey: "date",
//     header: ({ column }) => {
//       return (
//         <Button
//           variant="ghost"
//           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//           className="px-0 font-medium"
//         >
//           ORDER DATE
//           {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
//         </Button>
//       )
//     },
//     cell: ({ row }) => {
//       const date = new Date(row.original.created_at)
//       const formattedDate = date.toLocaleDateString('en-US', {
//         year: 'numeric',
//         month: 'short',
//         day: 'numeric'
//       })
//       const formattedTime = date.toLocaleTimeString('en-US', {
//         hour: '2-digit',
//         minute: '2-digit'
//       })

//       return (
//         <div className="flex flex-col">
//           <span className="text-sm font-medium">{formattedDate}</span>
//           <span className="text-xs text-gray-500">{formattedTime}</span>
//         </div>
//       )
//     },
//   },

//   {
//     accessorKey: "customer",
//     header: "CUSTOMER",
//     filterFn: (row, columnId, filterValue) => {
//       const name = row.original.customer_name?.toLowerCase() ?? "";
//       const email = row.original.customer_email?.toLowerCase() ?? "";
//       return (
//         name.includes(filterValue.toLowerCase()) ||
//         email.includes(filterValue.toLowerCase())
//       );
//     },
//     cell: ({ row }) => (
//       <div className="flex flex-col">
//         <span className="text-sm font-medium">
//           {row.original.customer_name || "Unknown Customer"}
//         </span>
//         <span className="text-xs text-gray-500">{row.original.customer_email}</span>
//       </div>
//     ),
//   },

//   {
//     accessorKey: "contact",
//     header: "CONTACT",
//     cell: ({ row }) => (
//       <div className="text-sm">{row.original.customer_phone || "N/A"}</div>
//     ),
//   },
//   {
//     accessorKey: "status",
//     header: "STATUS",
//     cell: ({ row }) => {
//       const status = row.getValue("status") as string

//       const statusVariant = (status: string) => {
//         switch (status.toLowerCase()) {
//           case "completed": return "default";
//           case "pending": return "secondary";
//           case "processing": return "outline";
//           case "cancelled": return "destructive";
//           default: return "outline";
//         }
//       }

//       return (
//         <Badge
//           variant={statusVariant(status)}
//           className="capitalize"
//         >
//           {status}
//         </Badge>
//       )
//     },
//   },
//   {
//     accessorKey: "amount",
//     header: ({ column }) => {
//       return (
//         <div className="text-right">
//           <Button
//             variant="ghost"
//             onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
//             className="px-0 font-medium"
//           >
//             TOTAL AMOUNT
//             {/* <ArrowUpDown className="ml-2 h-4 w-4" /> */}
//           </Button>
//         </div>
//       )
//     },
//     cell: ({ row }) => {
//       const amount = (row.original.total_amount)
//       const formatted = new Intl.NumberFormat("en-US", {
//         style: "currency",
//         currency: "EGP",
//       }).format(amount)

//       return (
//         <div className="text-right font-medium">
//           {formatted}
//         </div>
//       )
//     },
//   },
//   {
//     id: "actions",
//     // header:"Details",

//     cell: ({ row }) => {
//       // const router = useRouter()
//       const order = row.original

//       return (
//         <div className="text-right">
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 p-0">
//                 <span className="sr-only">Open menu</span>
//                 <MoreHorizontal className="h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               <DropdownMenuLabel>Actions</DropdownMenuLabel>
//               <DropdownMenuItem
//                 onClick={() => navigator.clipboard.writeText(order.id.toString())}
//               >
//                 Copy order ID
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem
//                 onClick={() => router.push(`/confirmed_order/${order.id}`)}
//               >
//                 <Eye className="mr-2 h-4 w-4" />
//                 View order details
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       )
//     },
//   },
// ])
// export default function DataTableDemo() {
//   const [sorting, setSorting] = React.useState<SortingState>([])
//   const [orders, setOrders] = React.useState<FullOrder[]>([])
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   )
//   const [columnVisibility, setColumnVisibility] =
//     React.useState<VisibilityState>({})
//   const [rowSelection, setRowSelection] = React.useState({})
//   const [loading, setLoading] = React.useState(true);
//  const router = useRouter()

//       const [isAdmin, setIsAdmin] = React.useState(false); // ✅ Track admin status
//     // ✅ Fetch admin status
//     React.useEffect(() => {
//       async function checkAdmin() {
//         try {
//           const res = await fetch("/api/admin/status");
//           const data = await res.json();
//           setIsAdmin(data.isAdmin);
//         } catch {
//           setIsAdmin(false);
//         }
//       }
//       checkAdmin();
//     }, []);

 
//   React.useEffect(() => {

//     const fetchedOrder = async () => {

//       try {

//         setLoading(true)

//         const res = await fetch('/api/orders',
//           {
//             method: "GET",
//           }

//         )

//         if (!res.ok) {
//           throw new Error('Failed to fetch order details');
//         }

//         const orderData = await res.json();
//         setOrders(orderData)
//       } catch (err) {
//         console.error("Error fetching order details:", err);
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchedOrder()
//   }, [])



//   console.log(orders)
//   const table = useReactTable({
//     data: orders,
//   columns: getColumns(router),
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onColumnVisibilityChange: setColumnVisibility,
//     onRowSelectionChange: setRowSelection,
//     state: {
//       sorting,
//       columnFilters,
//       columnVisibility,
//       rowSelection,
//     },
//   })
//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12 dark:bg-black">
//         <div className="container mx-auto px-4 max-w-6xl">
//           <div className="bg-white rounded-lg shadow-md p-8 text-center">
//             <div className="flex justify-center items-center">
//               <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-600"></div>
//             </div>
//             <p className="text-gray-500 mt-4">Loading ...</p>
//           </div>
//         </div>
//       </div>
//     );
//   }
//    if(!isAdmin){
//     return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold">Admin Dashboard</h1>
//       <p>Only visible to authenticated admins.</p>
//     </div>
//   );
//   }
// const exportToExcel = () => {
//   const allColumns = table
//     .getAllColumns()
//     .filter((col) => col.id !== "select" && col.id !== "actions");

//   // Manual mapping for derived columns
//   const fieldMapping: Record<string, keyof FullOrder> = {
//     date: "created_at",
//     customer: "customer_name",
//     contact: "customer_phone",
//     amount: "total_amount",
//   };

//   // Headers for Excel
//   const headers = allColumns.map((column) => {
//     const header = column.columnDef.header;
//     return typeof header === "function"
//       ? column.id
//       : (header as string) ?? column.id;
//   });

//   // Data rows
//   const data = orders.map((order) => {
// const row: Record<string, string | number> = {};

//     allColumns.forEach((column) => {
//       const accessorKey =
//         (column.columnDef as { accessorKey?: keyof FullOrder }).accessorKey;

//       let field: keyof FullOrder | undefined;

//       if (accessorKey) {
//         field = accessorKey; // direct accessor
//       } else if (fieldMapping[column.id]) {
//         field = fieldMapping[column.id]; // fallback mapping
//       }

//       let value = field ? order[field] : "";

//       // Format fields
//       if (field === "created_at" && value) {
//         const date = new Date(value as string);
//         value = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
//       }
//       if (field === "total_amount" && value !== undefined) {
//         value = Number(value).toFixed(2);
//       }

//       row[column.id] = value ?? "";
//     });

//     return row;
//   });

//   const ws = XLSX.utils.json_to_sheet(data, { header: headers });
//   const wb = XLSX.utils.book_new();
//   XLSX.utils.book_append_sheet(wb, ws, "Orders");
//   XLSX.writeFile(wb, "orders_export.xlsx");
// };



//   return (


//     <div className="w-full p-6 space-y-6 bg-white rounded-lg">
//       {/* Header with filters and controls */}
//       <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
//         <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>

//         <div className="flex flex-col gap-3 md:flex-row md:items-center">
//           {/* Customer Filter */}
//           <div className="flex-1">
//             <Input
//               placeholder="Filter by customer..."
//               value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
//               onChange={(event) =>
//                 table.getColumn("customer")?.setFilterValue(event.target.value)
//               }
//               className="max-w-xs"
//             />
//           </div>
//           <div className="flex-1">
//             <Input
//               placeholder="Filter by Order Id..."
//               value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
//               onChange={(event) =>
//                 table.getColumn("id")?.setFilterValue(event.target.value)
//               }
//               className="max-w-xs"
//             />
//           </div>


//           {/* Status Filter */}
//           <div className="flex-1">
//             <select
//               value={(table.getColumn("status")?.getFilterValue() as string) ?? ""}
//               onChange={(event) =>
//                 table.getColumn("status")?.setFilterValue(
//                   event.target.value === "all" ? "" : event.target.value
//                 )
//               }
//               className="flex h-10 w-full max-w-xs items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
//             >
//               <option value="all">All Statuses</option>
//               <option value="pending">Pending</option>
//               <option value="processing">Processing</option>
//               <option value="completed">Completed</option>
//               <option value="cancelled">Cancelled</option>
//             </select>
//           </div>
//  <Button 
//             onClick={exportToExcel} 
//             variant="outline" 
//             className="bg-red-600 text-white hover:bg-red-700"
//           >
//             Export to Excel
//           </Button>
//           {/* Column Visibility Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="outline" className="ml-auto">
//                 Columns <ChevronDown className="ml-2 h-4 w-4" />
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end">
//               {table
//                 .getAllColumns()
//                 .filter((column) => column.getCanHide())
//                 .map((column) => {
//                   return (
//                     <DropdownMenuCheckboxItem
//                       key={column.id}
//                       className="capitalize"
//                       checked={column.getIsVisible()}
//                       onCheckedChange={(value) =>
//                         column.toggleVisibility(!!value)
//                       }
//                     >
//                       {column.id}
//                     </DropdownMenuCheckboxItem>
//                   )
//                 })}
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-hidden rounded-md border shadow-sm">
//         <Table>
//           <TableHeader className="bg-gray-50">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header) => {
//                   return (
//                     <TableHead key={header.id} className="py-3 font-medium">
//                       {header.isPlaceholder
//                         ? null
//                         : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                     </TableHead>
//                   )
//                 })}
//               </TableRow>
//             ))}
//           </TableHeader>
//           <TableBody>
//             {table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   className="border-b border-gray-100 hover:bg-gray-50"
//                 >
//                   {row.getVisibleCells().map((cell) => (
//                     <TableCell key={cell.id} className="py-3">
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//     colSpan={table.getAllLeafColumns().length}
//                   className="h-24 text-center py-4"
//                 >
//                   <div className="flex flex-col items-center justify-center py-6">
//                     <p className="text-gray-500 text-lg font-medium">No orders found</p>
//                     <p className="text-gray-400 text-sm mt-1">
//                       Try adjusting your search or filter to find what you are looking for.
//                     </p>
//                   </div>
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination and Selection Info */}
//       <div className="flex flex-col gap-4 items-start justify-between py-4 md:flex-row md:items-center">
//         <div className="text-muted-foreground text-sm">
//           {table.getFilteredSelectedRowModel().rows.length} of{" "}
//           {table.getFilteredRowModel().rows.length} row(s) selected.
//         </div>

//         <div className="flex items-center space-x-2 self-stretch md:self-auto">
//           <div className="text-sm text-gray-600 whitespace-nowrap mr-2">
//             Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
//           </div>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.previousPage()}
//             disabled={!table.getCanPreviousPage()}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             size="sm"
//             onClick={() => table.nextPage()}
//             disabled={!table.getCanNextPage()}
//           >
//             Next
//           </Button>
//         </div>
//       </div>
//     </div>
//   )
// }
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
import { ChevronDown, Eye, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import * as XLSX from "xlsx"

interface FullOrder {
  id: number;
  customer_id: number | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  cart_id: number;
  order_date: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled' | string;
  payment_method: 'credit_card' | 'paypal' | 'cash_on_delivery' | string;
  payment_status: 'paid' | 'unpaid' | 'refunded' | string;
  total_amount: number;
  shipping_address: string;
  billing_address: string;
  shipping_city: string;
  shipping_state: string;
  shipping_postal_code: string;
  shipping_country: string;
  created_at: string;
  updated_at: string;
}

export const getColumns = (router: ReturnType<typeof useRouter>): ColumnDef<FullOrder>[] => ([
  {
    accessorKey: "id",
    header: "ORDER ID",
    filterFn: (row, columnId, filterValue) => {
      const id = row.original.id?.toString() || "";
      return id.includes(filterValue.toString());
    },
    cell: ({ row }) => (
      <div className="font-mono text-sm text-gray-700">{row.original.id}</div>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="px-0 font-medium"
        >
          ORDER DATE
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.created_at)
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit'
      })

      return (
        <div className="flex flex-col">
          <span className="text-sm font-medium">{formattedDate}</span>
          <span className="text-xs text-gray-500">{formattedTime}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "customer",
    header: "CUSTOMER",
    filterFn: (row, columnId, filterValue) => {
      const name = row.original.customer_name?.toLowerCase() ?? "";
      const email = row.original.customer_email?.toLowerCase() ?? "";
      return (
        name.includes(filterValue.toLowerCase()) ||
        email.includes(filterValue.toLowerCase())
      );
    },
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="text-sm font-medium">
          {row.original.customer_name || "Unknown Customer"}
        </span>
        <span className="text-xs text-gray-500">{row.original.customer_email}</span>
      </div>
    ),
  },
  {
    accessorKey: "contact",
    header: "CONTACT",
    cell: ({ row }) => (
      <div className="text-sm">{row.original.customer_phone || "N/A"}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "STATUS",
    cell: ({ row }) => {
      const status = row.getValue("status") as string

      const statusVariant = (status: string) => {
        switch (status.toLowerCase()) {
          case "completed": return "default";
          case "pending": return "secondary";
          case "processing": return "outline";
          case "cancelled": return "destructive";
          default: return "outline";
        }
      }

      return (
        <Badge
          variant={statusVariant(status)}
          className="capitalize"
        >
          {status}
        </Badge>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="px-0 font-medium"
          >
            TOTAL AMOUNT
          </Button>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = (row.original.total_amount)
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "EGP",
      }).format(amount)

      return (
        <div className="text-right font-medium">
          {formatted}
        </div>
      )
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const order = row.original

      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(order.id.toString())}
              >
                Copy order ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => router.push(`/confirmed_order/${order.id}`)}
              >
                <Eye className="mr-2 h-4 w-4" />
                View order details
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
])

export default function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [orders, setOrders] = React.useState<FullOrder[]>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})
  const [loading, setLoading] = React.useState(true);
  const router = useRouter()
  const [isAdmin, setIsAdmin] = React.useState(false);

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
    const fetchedOrder = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/orders', {
          method: "GET",
        })

        if (!res.ok) {
          throw new Error('Failed to fetch order details');
        }

        const orderData = await res.json();
        setOrders(orderData)
      } catch (err) {
        console.error("Error fetching order details:", err);
      } finally {
        setLoading(false)
      }
    }

    fetchedOrder()
  }, [])

  const exportToExcel = () => {
    // Define the columns we want to export with proper mapping
    const exportColumns = [
      { key: 'id', header: 'ORDER ID' },
      { key: 'created_at', header: 'ORDER DATE', format: (value: string) => {
        const date = new Date(value);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
      }},
      { key: 'customer_name', header: 'CUSTOMER NAME' },
      { key: 'customer_email', header: 'CUSTOMER EMAIL' },
      { key: 'customer_phone', header: 'CONTACT' },
      { key: 'status', header: 'STATUS' },
      { key: 'total_amount', header: 'TOTAL AMOUNT', format: (value: number) => {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "EGP",
        }).format(value);
      }},
      { key: 'payment_method', header: 'PAYMENT METHOD' },
      { key: 'payment_status', header: 'PAYMENT STATUS' },
      { key: 'shipping_address', header: 'SHIPPING ADDRESS' },
      { key: 'shipping_city', header: 'CITY' },
      { key: 'shipping_state', header: 'STATE' },
      { key: 'shipping_postal_code', header: 'POSTAL CODE' },
      { key: 'shipping_country', header: 'COUNTRY' },
    ];

    // Prepare data for export
    const data = orders.map((order) => {
      const row: Record<string, string | number> = {};
      
      exportColumns.forEach((col) => {
        if (col.key in order) {
          const value = order[col.key as keyof FullOrder];
          
          // Apply formatting if specified
          if (col.format && value !== undefined && value !== null) {
            row[col.header] = col.format(value as never);
          } else {
            row[col.header] = value !== undefined && value !== null ? String(value) : 'N/A';
          }
        } else {
          row[col.header] = 'N/A';
        }
      });
      
      return row;
    });

    // Create worksheet and workbook
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    
    // Auto-size columns
    const colWidths = exportColumns.map(col => ({ 
      wch: Math.max(col.header.length, 15) 
    }));
    ws['!cols'] = colWidths;
    
    XLSX.utils.book_append_sheet(wb, ws, "Orders");
    
    // Generate file name with timestamp
    const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    XLSX.writeFile(wb, `orders_export_${timestamp}.xlsx`);
  };

  const table = useReactTable({
    data: orders,
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
        <h2 className="text-2xl font-bold text-gray-900">Order Management</h2>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          {/* Customer Filter */}
          <div className="flex-1">
            <Input
              placeholder="Filter by customer..."
              value={(table.getColumn("customer")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("customer")?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Filter by Order Id..."
              value={(table.getColumn("id")?.getFilterValue() as string) ?? ""}
              onChange={(event) =>
                table.getColumn("id")?.setFilterValue(event.target.value)
              }
              className="max-w-xs"
            />
          </div>

          {/* Status Filter */}
          <div className="flex-1">
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
          </div>
          
          <Button 
            onClick={exportToExcel} 
            variant="outline" 
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Export to Excel
          </Button>
          
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