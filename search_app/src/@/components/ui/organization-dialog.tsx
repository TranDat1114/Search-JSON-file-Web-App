
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


interface props {
    organization: Organization;
}

export function OrganizationDialog({ organization }: props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="w-full" variant="outline">View organization</Button>
            </DialogTrigger>
            <DialogContent className="w-max">
                <DialogHeader>
                    <DialogTitle>Id: {organization._id}</DialogTitle>
                </DialogHeader>
                <div className="">
                    <div className="grid grid-cols-2 gap-1 justify-between">
                        <p className="text-lg font-semibold">
                            Name:
                        </p>
                        <p className="text-xl font-bold">{organization.name}</p>
                        <p className="text-lg font-semibold">
                            External id:
                        </p>
                        <p className="text-lg text-muted-foreground">{organization.external_id}</p>
                        <p className="text-lg font-semibold">
                            Url:
                        </p>
                        <p className="text-lg truncate underline"><Link to={organization.url}>{organization.url}</Link></p>
                        <p className="text-lg font-semibold">
                            Details:
                        </p>
                        <p className="text-lg ">{organization.details}</p>
                        <p className="text-lg font-semibold">
                            Created at:
                        </p>
                        <p className="text-lg text-muted-foreground">{organization.created_at}</p>

                        <p className="text-lg font-semibold">
                            Shared:
                        </p>
                        <p className="text-lg text-muted-foreground">{organization.shared_tickets ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
