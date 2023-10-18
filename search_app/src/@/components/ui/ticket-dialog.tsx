
import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react";

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
interface props {
    ticket: Ticket;
}

export function TicketDialog({ ticket }: props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" variant="outline">View Ticket</Button>
            </DialogTrigger>
            <DialogContent className="w-max">
                <DialogHeader>
                    <DialogTitle>Id: {ticket._id}</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="grid grid-cols-2 gap-1 justify-between">
                        <p className="text-lg font-semibold">
                            Name:
                        </p>
                        <p className="text-xl font-bold">{ticket.subject}</p>
                        <p className="text-lg font-semibold">
                            External id:
                        </p>
                        <p className="text-lg text-muted-foreground">{ticket.external_id}</p>
                        <p className="text-lg font-semibold">
                            Url:
                        </p>
                        <p className="text-lg truncate underline"><Link to={ticket.url}>{ticket.url}</Link></p>
                        <p className="text-lg font-semibold">
                            Created at:
                        </p>
                        <p className="text-lg text-muted-foreground">{ticket.created_at}</p>
                        <p className="text-lg font-semibold">
                            Due at:
                        </p>
                        <p className="text-lg text-muted-foreground">{ticket.due_at}</p>
                        <p className="text-lg font-semibold">
                            Priority:
                        </p>
                        <p className="text-lg ">{ticket.priority}</p>
                        <p className="text-lg font-semibold">
                            Type:
                        </p>
                        <p className="text-lg ">{ticket.type}</p>
                        <p className="text-lg font-semibold">
                            Status:
                        </p>
                        <p className="text-lg ">{ticket.status}</p>
                        <p className="text-lg font-semibold">
                            Via:
                        </p>
                        <p className="text-lg ">{ticket.via}</p>
                        <p className="text-lg font-semibold">
                            Has incidents:
                        </p>
                        {ticket.has_incidents ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}

                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
