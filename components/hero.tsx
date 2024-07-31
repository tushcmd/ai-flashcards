'use client'

import { useContext } from "react";
import { Button } from "./ui/button";
import { ModalContext } from "@/components/modals/modal-providers";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
export default function Hero() {
    const { setShowSignInModal } = useContext(ModalContext);
    const { data: session, status } = useSession(); // Get session data
    const router = useRouter(); // Use the router

    const handleAction = () => {
        if (session) {
            router.push('/generate');
        } else {
            setShowSignInModal(true);
        }
    };

    //  md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed
    // md:min-h-screen
    return (
        <div className="layout-container mt-16 mx-auto pb-4 px-4 sm:px-8">
            <div className="text-center space-y-4">
                <h1 className="text-3xl md:text-4xl">
                    Optimize your study with <br />
                    <span className="font-bold"> Flash cards</span>
                </h1>
                <p className="mx-auto leading-relaxed max-w-3xl text-muted-foreground">
                    It is established that concepts stick better with quick revision questions. Our flash cards offer you the best experience when revising in whichever topics.
                </p>
            </div>
            <div className="text-center space-x-4 space-y-3 mt-6 justify-center items-center sm:space-x-6 sm:space-y-0 sm:flex">

                <Button
                    variant="outline"
                >
                    <a href="#pricing">Go Pricing</a>

                </Button>
                <Button
                    variant="default"
                    onClick={handleAction}
                >
                    <span>{session ? "Generate Flashcards" : "Get Started"}</span>
                    <ArrowRight className="size-4" />
                </Button>
            </div>
            <div className="text-center justify-center items-center flex mt-6">
                <Image
                    className="rounded-lg"
                    src="/_static/flashc60.png"
                    alt="alt"
                    width={494}
                    height={291}
                    style={{
                        maskImage: `linear-gradient(to top, transparent, black 20%)`,
                    }}
                />
            </div>

        </div>
    )
}


