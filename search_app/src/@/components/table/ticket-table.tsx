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
import DebouncedInput from "../ui/debounced-input"
import { CheckCircle2, XCircle } from "lucide-react"
import { Link } from "react-router-dom"
import { TicketDialog } from "../ui/ticket-dialog"


export type Ticket = {
    _id: string;
    url: string;
    external_id: string;
    created_at: string;
    type?: "incident" | "problem" | "question" | "task";
    subject: string;
    description?: string;
    priority: "high" | "low" | "normal" | "urgent";
    status: "pending" | "hold" | "closed" | "solved" | "open";
    submitter_id: number;
    assignee_id?: number;
    organization_id?: number;
    tags: string[];
    has_incidents: boolean;
    due_at?: string;
    via: "web" | "chat" | "voice";
}


// Tạo bảng nha
export const columns: ColumnDef<Ticket>[] = [
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
        accessorKey: "subject",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Subject
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("subject")}</div>,
    },
    {
        accessorKey: "description",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Description
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("description")}</div>,
    },
    {
        accessorKey: "priority",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Priority
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("priority")}</div>,
    },
    {
        accessorKey: "type",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Types
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("type")}</div>,
    },
    {
        accessorKey: "has_incidents",
        header: () => {
            return (
                <div className="whitespace-nowrap">
                    Has incidents
                </div>
            )
        },
        cell: ({ row }) => row.getValue<boolean>("has_incidents") ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>,
    },
    {
        accessorKey: "status",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-start items-center w-full">
                        <div className="whitespace-nowrap">
                            Status
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="">{row.getValue("status")}</div>,
    },
    {
        accessorKey: "via",
        header: "Via",
        cell: ({ row }) => <div className="">{row.getValue("via")}</div>,
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
                <div className="text-right w-[200px]">
                    {
                        row.getValue<string[]>("tags").map((tag, index) => (
                            <Badge key={index} className='m-1'>{tag}</Badge>
                        ))
                    }
                </div>
            )

        },
    },
    {
        accessorKey: "due_at",
        header: ({ column }) => {
            return (
                <Button className="w-full"
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="inline-flex justify-end items-center w-full">
                        <div className="whitespace-nowrap">
                            Due at
                        </div>
                        <CaretSortIcon className="ml-2 h-4 w-4" />
                    </div>
                </Button>
            )
        },
        cell: ({ row }) => <div className="text-right whitespace-pre-wrap">{row.getValue<string>("due_at")}</div>
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
                            onClick={() => navigator.clipboard.writeText(row.original._id)}
                        >
                            Copy _id
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(row.original.external_id)}
                        >
                            Copy external id
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link to={`/user/${row.original.submitter_id}`}>View this ticket's submitter</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/user/${row.original.assignee_id}`}>View this ticket's assignee</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link to={`/organization/${row.original.organization_id}`}>View this ticket's organization</Link>
                        </DropdownMenuItem>
                        <TicketDialog ticket={row.original} />

                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    }
]

const api_Url = "https://search-json-file-server-db.vercel.app/tickets"
type props = {
    ticketInputId: string | undefined
    assigneeInputId: string | undefined
    submitedInputId: string | undefined
    organizationInputId: string | undefined
}

export function OrganizationTicketDataTable({ ticketInputId, assigneeInputId, submitedInputId, organizationInputId }: props) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const [globalFilter, setGlobalFilter] = React.useState('')
    const [tickets, setTickets] = React.useState<Ticket[]>([]);
    const { toast } = useToast()

    React.useEffect(() => {
        axios.get(api_Url)
            .then((response) => {
                const data: Ticket[] = response.data;

                if (ticketInputId != undefined) {
                    setTickets(data.filter(f => f._id === ticketInputId));
                } else if (assigneeInputId != undefined) {
                    setTickets(data.filter(f => f.assignee_id === Number.parseInt(assigneeInputId)));
                }
                else if (submitedInputId != undefined) {
                    setTickets(data.filter(f => f.submitter_id === Number.parseInt(submitedInputId)));
                }
                else if (organizationInputId != undefined) {
                    setTickets(data.filter(f => f.organization_id === Number.parseInt(organizationInputId)));
                }
                else {
                    setTickets(data);
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
    }, [assigneeInputId, organizationInputId, submitedInputId, ticketInputId, toast]);

    const data = tickets;

    const table = useReactTable<Ticket>({
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
