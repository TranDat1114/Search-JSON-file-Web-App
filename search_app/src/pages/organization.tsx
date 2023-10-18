import { OrganizationDataTable } from "../@/components/table/organization-table"
import { useParams } from "react-router-dom";

type RouteParams = {
    organizationId: string | undefined;
}
export const OrganizationPage = () => {
    const { organizationId } = useParams<RouteParams>();

    return (
        <>
            <OrganizationDataTable organizationInputId={organizationId} />
        </>
    )
}

