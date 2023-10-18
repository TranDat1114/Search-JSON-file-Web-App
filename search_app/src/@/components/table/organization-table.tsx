"use client"

import * as React from "react"
import {
    CaretSortIcon,
    ChevronDownIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Button } from "../../components/ui/button"
import { Checkbox } from "../../components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../../components/ui/table"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import { Badge } from "../ui/badge"
import { Link } from "react-router-dom"
import { CheckCircle2, XCircle } from "lucide-react"
import DebouncedInput from "../ui/debounced-input"
import { OrganizationDialog } from "../ui/organization-dialog"

export type Organization = {
    _id: number;
    url: string;
    external_id: string;
    name: string;
    domain_names: string[];
    created_at: string;
    details: string;
    shared_tickets: boolean;
    tags: string[];
}



// Tạo bảng nha
export const columns: ColumnDef<Organization>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "_id",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Id
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className=" text-center">{row.getValue("_id")}</div>,
    },

    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Names
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "details",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Details
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("details")}</div>,
    },
    {
        accessorKey: "shared_tickets",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Shared
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div>{row.getValue<boolean>("shared_tickets") ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}</div>,
    },
    {
        accessorKey: "domain_names",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Domain names
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-right w-[250px]">
                    {
                        row.getValue<string[]>("domain_names").map((domain, index) => (
                            <div key={index} className='inline-flex'>
                                <Badge className='m-1'>{domain}</Badge>
                            </div>
                        )
                        )
                    }
                </div>
            )

        },
    },
    {
        accessorKey: "tags",
        header: ({ column }) => {
            return (
                <Button className="w-full text-right"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Tags
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => {
            return (
                <div className="text-right w-[250px]">
                    {
                        row.getValue<string[]>("tags").map((tag, index) => (
                            <div key={index} className='inline-flex'>
                                <Badge className='m-1'>{tag}</Badge>
                            </div>
                        )
                        )
                    }
                </div>
            )
        }
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Created at
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue<string>("created_at")}</div>
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <DotsHorizontalIcon className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original._id.toString())}
                        >
                            Copy this id
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.external_id)}
                        >
                            Copy this external id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`/ticket-organization/${row.original._id}`}>View this organization's ticket</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/user-organization/${row.original._id}`}>View this organization's user </Link>
                        </DropdownMenuItem>
                        <OrganizationDialog organization={row.original} />
                    </DropdownMenuContent>
                </DropdownMenu >
            )
        }
    }
]

const api_Url = "https://search-json-file-server-db.vercel.app/organizations"
type props = {
    organizationInputId: string | undefined
}

export function OrganizationDataTable({ organizationInputId }: props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )

    const [globalFilter, setGlobalFilter] = React.useState('')

    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [organizations, setOrganizations] = React.useState<Organization[]>([]);
    const { toast } = useToast()

    React.useEffect(() => {
        axios.get(api_Url)
            .then((response) => {
                const data: Organization[] = response.data;
                console.log(data);

                if (organizationInputId != undefined) {
                    setOrganizations(data.filter(f => f._id === Number.parseInt(organizationInputId)));
                } else {
                    setOrganizations(data);
                }
            })
            .catch((error) => {
                console.error('Lỗi khi gọi API:', error);
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: error?.message ?? "Unknown error",
                });
            });
    }, [organizationInputId, toast]);

    const data = organizations;

    const table = useReactTable<Organization>({
        data,
        columns,
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
            globalFilter
        },
        onGlobalFilterChange: setGlobalFilter,
    })

    return (
        <div className='container mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border'>

            <div className="w-full">
                <div className="flex items-center py-4">

                    <DebouncedInput
                        value={globalFilter ?? ''}
                        onChange={value => setGlobalFilter(String(value))}
                        className="p-2 font-lg shadow border border-block"
                        placeholder="Search all columns..."
                    />

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
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
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
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
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow key={0}>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="space-x-2">
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
        </div>
    )
}
