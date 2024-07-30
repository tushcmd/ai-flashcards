import { getCurrentUser } from '@/lib/session'
import { redirect } from "next/navigation";

export default async function Page() {

    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") redirect("/");
    // || user.role !== "ADMIN"

    return (
        <div className="layout-container min-h-screen text-center">
            Admin
        </div>
    )
}