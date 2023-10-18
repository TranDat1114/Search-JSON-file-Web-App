import { Link } from "react-router-dom"


export const HomePage = () => {
    return (
        <>

            <Link to={"/organization"}>Organizations</Link>
            <hr />
            <Link to={"/ticket"}>Tickets</Link>
            <hr />
            <Link to={"/user"}>Users</Link>
        </>
    )
}

