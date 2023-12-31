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

import { Button } from "../ui/button"
import { Checkbox } from "../ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "../ui/table"
import { useToast } from "../ui/use-toast"
import axios from "axios"
import { Badge } from "../ui/badge"
import { CheckCircle2, XCircle } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { UserProfileDialog } from "../ui/user-profile-dialog"
import { Link } from "react-router-dom"
import DebouncedInput from "../ui/debounced-input"

export type User = {
    _id: number;
    url: string;
    external_id: string;
    name: string;
    alias?: string;
    created_at: string;
    active: boolean;
    verified?: boolean;
    shared: boolean;
    locale?: "en-AU" | "zh-CN" | "de-CH";
    timezone?: string;
    last_login_at: string;
    email?: string;
    phone: string;
    signature: "Don't Worry Be Happy!";
    organization_id?: number;
    tags: string[];
    suspended: boolean;
    role: "admin" | "end-user" | "agent";
}

// Tạo bảng nha
export const columns: ColumnDef<User>[] = [
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
        accessorKey: "alias",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Alias
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <div className="">{row.getValue("alias")}</div>
                    </TooltipTrigger>
                    <TooltipContent>
                        {row.original.name}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
        ,
    },
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Names
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("name")}</div>,
    },
    {
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Emails
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "phone",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Phones
                    <CaretSortIcon className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("phone")}</div>,
    },

    {
        accessorKey: "active",
        header: "Active",
        cell: ({ row }) => <div className=" text-center">{row.getValue<boolean>("active") ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}</div>,
    },
    {
        accessorKey: "shared",
        header: "Shared",
        cell: ({ row }) => <div className=" text-center">{row.getValue<boolean>("shared") ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}</div>,
    },
    {
        accessorKey: "verified",
        header: "Verified",
        cell: ({ row }) => <div className=" text-center">{row.getValue<boolean>("verified") ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}</div>,
    },
    {
        accessorKey: "tags",
        header: ({ column }) => {
            return (
                <Button className="w-full"
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
                        ))
                    }
                </div>
            )

        },
    },
    {
        accessorKey: "timezone",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Timezone
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-right">{row.getValue("timezone")}</div>,
    },
    {
        accessorKey: "last_login_at",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Last login
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-right whitespace-pre-wrap">{row.getValue<string>("last_login_at")}</div>
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
                            Copy _id
                        </DropdownMenuItem> <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.external_id)}
                        >
                            Copy external id
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/organization/${row.original.organization_id}`}>View this user's organization</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/ticket-assignee/${row.original._id}`}>View this user's assignee ticket subject</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/ticket-submited/${row.original._id}`}>View this user's submited ticket subject</Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <UserProfileDialog user={row.original} />
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

const api_Url = "https://search-json-file-server-db.vercel.app/users"
type props = {
    userInputId: string | undefined,
    organizationInputId: string | undefined
}

export function OrganizationUserDataTable({ userInputId, organizationInputId }: props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [globalFilter, setGlobalFilter] = React.useState('')
    const [users, setUsers] = React.useState<User[]>([]);
    const { toast } = useToast()

    React.useEffect(() => {
        axios.get(api_Url)
            .then((response) => {
                const data: User[] = response.data;
                if (userInputId != undefined) {
                    setUsers(data.filter(f => f._id === Number.parseInt(userInputId)));
                } else if (organizationInputId != undefined) {
                    setUsers(data.filter(f => f.organization_id === Number.parseInt(organizationInputId)));
                } else {
                    setUsers(data);
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
    }, [userInputId, toast, organizationInputId]);

    const data = users;

    const table = useReactTable<User>({
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
            globalFilter,
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
