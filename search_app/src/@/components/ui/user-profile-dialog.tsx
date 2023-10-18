import altImg from "../../../assets/altIMG.png"
import { AspectRatio } from "../ui/aspect-ratio"
import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { CheckCircle2, XCircle } from "lucide-react";

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

interface props {
    user: User;
}

export function UserProfileDialog({ user }: props) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">View profile</Button>
            </DialogTrigger>
            <DialogContent className="">
                <DialogHeader>
                    <DialogTitle>{user.alias}</DialogTitle>

                </DialogHeader>
                <div className="w-[300px] m-auto">
                    <AspectRatio ratio={1 / 1} className="bg-muted">
                        <img
                            src={altImg}
                            alt="Photo by Drew Beamer"
                            className="rounded-md object-cover"
                        />
                    </AspectRatio>
                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{user.name}</p>
                    <p className="text-lg text-muted-foreground">{user.alias}</p>
                    <p className="text-lg ">{user.phone}</p>
                    <p className="text-lg ">{user.email}</p>
                </div>
                <div className="grid grid-cols-2 justify-between">
                    <p className="text-lg font-semibold">
                        Role:
                    </p>
                    <p className="text-lg ">{user.role}</p>
                    <p className="text-lg font-semibold">
                        Signature:
                    </p>
                    <p className="text-lg ">{user.signature}</p>
                    <p className="text-lg font-semibold">
                        Created at:
                    </p>
                    <p className="text-lg text-muted-foreground">{user.created_at}</p>

                </div>
                <div className="grid grid-cols-4">
                    <p className="text-lg font-semibold">
                        Active:
                    </p>

                    <p className="text-lg font-semibold">
                        Suspended:
                    </p>

                    <p className="text-lg font-semibold">
                        Verified:
                    </p>

                    <p className="text-lg font-semibold">
                        Shared:
                    </p>

                </div>
                <div className="grid grid-cols-4">

                    <p className="text-lg text-muted-foreground">{user.active ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-muted-foreground">{user.suspended ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-muted-foreground">{user.verified ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-muted-foreground">{user.shared ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                </div>

            </DialogContent>
        </Dialog>
    )
}
