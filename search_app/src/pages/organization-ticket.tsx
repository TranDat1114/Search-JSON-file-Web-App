import { useParams } from "react-router-dom";
import { OrganizationTicketDataTable } from "../@/components/table/organization-ticket-table"
type RouteParams = {
    organizationId: string;
}


export const OrganizationTicketPage = () => {
    const { organizationId } = useParams<RouteParams>();
    return (
        <>
            {organizationId != undefined ? <OrganizationTicketDataTable organizationInputId={organizationId} /> : "Not Found 🤔🤔 Maybe you lost on internet and meet me👋 😽"}

        </>
    )
}


export default OrganizationTicketPage;