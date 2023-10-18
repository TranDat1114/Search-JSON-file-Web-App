import { useParams } from "react-router-dom";
import { OrganizationUserDataTable } from "../@/components/table/user-table"
type RouteParams = {
    userId: string | undefined;
    organizationId: string | undefined;
}


export const UserPage = () => {
    const { userId, organizationId } = useParams<RouteParams>();
    return (
        <>
            <OrganizationUserDataTable userInputId={userId} organizationInputId={organizationId} />
        </>
    )
}


export default UserPage;