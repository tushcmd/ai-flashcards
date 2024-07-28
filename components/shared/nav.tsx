'use client'

import React, { FC, useContext } from 'react';
// import ThemeSwitcherButton from '../ui/ThemeSwitcher';
import Logo from './logo';
import { Button } from '../ui/button';
import { ArrowRight } from 'lucide-react';
import { ModalContext } from "@/components/modals/modal-providers";

const Navbar: FC = () => {
    const { setShowSignInModal } = useContext(ModalContext);
    return (
        <nav className="py-4">
            <div className="layout-container flex justify-between items-center border-b py-1">
                <Logo />

                <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowSignInModal(true)}
                >
                    <span>Sign In</span>
                    <ArrowRight className="size-4" />
                </Button>
                {/* <ThemeSwitcherButton /> */}
            </div>
        </nav>
    );
};

export default Navbar;