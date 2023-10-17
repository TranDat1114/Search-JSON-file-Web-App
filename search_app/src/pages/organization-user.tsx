import { useParams } from "react-router-dom";
import { OrganizationUserDataTable } from "../@/components/table/organization-user-table"
type RouteParams = {
    organizationId: string;
}


export const OrganizationUserPage = () => {
    const { organizationId } = useParams<RouteParams>();
    return (
        <>
            {organizationId != undefined ? <OrganizationUserDataTable organizationInputId={organizationId} /> : "Not Found 🤔🤔 Maybe you lost on internet and meet me👋 😽"}

        </>
    )
}


export default OrganizationUserPage;