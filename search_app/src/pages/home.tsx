import { Link } from "react-router-dom"


export const HomePage = () => {
    return (
        <div className="min-h-screen">
            <div className="flex min-h-[350px] w-full justify-center items-center ">
                <div className="w-[350px] m-auto">
                    <div className='container mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 relative rounded-md border p-5'>
                        <div className="grid grid-cols-1 justify-center items-center gap-5">
                            <div className="flex justify-between w-full">
                                <Link to={"/organization"}><p className="text-xl font-mono">Organizations</p></Link>
                                ...list Organization
                            </div>
                            <hr />
                            <div className="flex justify-between w-full">
                                <Link to={"/ticket"}><p className="text-xl font-mono">Tickets</p></Link> ...list Ticket
                            </div>
                            <hr />
                            <div className="flex justify-between w-full">
                                <Link to={"/user"}><p className="text-xl font-mono">Users</p></Link> ...list User
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

