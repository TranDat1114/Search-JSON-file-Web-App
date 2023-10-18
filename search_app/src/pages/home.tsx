import { Link } from "react-router-dom"


export const HomePage = () => {
    return (
        <>
            <Link to={"/organization"}>Organizations</Link>
            <Link to={"/ticket"}>Tickets</Link>
            <Link to={"/user"}>Users</Link>
        </>
    )
}

