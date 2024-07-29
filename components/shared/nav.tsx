'use client'

import React, { FC, useContext } from 'react';
import Logo from './logo';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { ModalContext } from "@/components/modals/modal-providers";
import { UserAccountNav } from './user-account-nav';
import { useSession } from "next-auth/react";
import { Skeleton } from '../ui/skeleton';

const Navbar: FC = () => {
    const { setShowSignInModal } = useContext(ModalContext);
    const { data: session, status } = useSession();
    return (
        <nav className="py-4">
            <div className="layout-container flex justify-between items-center border-b py-1">
                <Logo />

                {session ? (
                    <UserAccountNav />
                ) : status === "unauthenticated" ?
                    (
                        <Button
                            variant="default"
                            size="sm"
                            onClick={() => setShowSignInModal(true)}
                        >
                            <span>Sign In</span>
                            <ArrowRight className="size-4" />
                        </Button>
                    ) : (
                        <Skeleton className='hidden h-9 w-28 rounded-full lg:flex' />
                    )
                }

                {/* {session ? <UserAccountNav /> : null} */}
            </div>
        </nav>
    );
};

export default Navbar;