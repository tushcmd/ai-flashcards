import Flashcard from '@/components/flash-card';
// import { getCurrentUser } from '@/lib/session'
// import { redirect } from "next/navigation";


export default async function Page() {
    // const user = await getCurrentUser();

    // if (!user)
    //     return <div>Not authenticated</div>
    // redirect("/");

    return (
        <div>
            <Flashcard />
        </div>
    )
}