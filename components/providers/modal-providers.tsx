"use client"

import { useEffect, useState } from "react";
import { CreateServer } from "@/components/modals/create-server";
import { InviteMember } from "@/components/modals/invite-member";

export const ModalProvider = () => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if(!isMounted) return null;

    return (
        <>
            <CreateServer />
            <InviteMember />
        </>
    )
}