import { Button } from "../../components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
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
                <div className="inline-flex justify-center">
                    <Avatar>
                        <AvatarImage src="https://camo.githubusercontent.com/9ebf5324b941f61a34bc99ca10d201c0b7715708d9489cdfe9bf982ffabd3720/68747470733a2f2f7062732e7477696d672e636f6d2f70726f66696c655f696d616765732f313637333332343635323334333535383134352f4e484f4f4e3778785f343030783430302e6a7067" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>

                </div>
                <div className="text-center">
                    <p className="text-xl font-bold">{user.name}</p>
                    <p className="text-lg text-secondary">{user.alias}</p>
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
                    <p className="text-lg text-secondary">{user.created_at}</p>

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

                    <p className="text-lg text-secondary">{user.active ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-secondary">{user.suspended ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-secondary">{user.verified ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                    <p className="text-lg text-secondary">{user.shared ? <div className="text-primary"><CheckCircle2 /></div> : <div className="text-destructive"><XCircle /></div>}
                    </p>
                </div>

            </DialogContent>
        </Dialog>
    )
}
