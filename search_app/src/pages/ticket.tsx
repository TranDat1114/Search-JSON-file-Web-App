import { useParams } from "react-router-dom";
import { OrganizationTicketDataTable } from "../@/components/table/ticket-table"
type RouteParams = {
    ticketId: string | undefined;
    assigneeId: string | undefined
    submitedId: string | undefined
    organizationId: string | undefined
}


export const TicketPage = () => {
    const { ticketId, assigneeId, submitedId, organizationId } = useParams<RouteParams>();
    return (
        <>
            <OrganizationTicketDataTable ticketInputId={ticketId} assigneeInputId={assigneeId} submitedInputId={submitedId} organizationInputId={organizationId} />
        </>
    )
}


export default TicketPage;