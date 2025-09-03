'use client'

import NextLink from 'next/link'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react'

function Link
    ({
        children,
        href,
        ...rest
    }:
        {
            children: React.ReactNode;
            href: string;
            target?: string
        } & HTMLAttributes<HTMLAnchorElement>
    ) {

    const [prefetching, setPrefetching] = useState<boolean>(false);
    const linkref = useRef<HTMLAnchorElement>(null)

    const setPrefetchListener = () => {
        setPrefetching(true);
    };
    const removePrefetchListener = () => {
        setPrefetching(false);
    };

    useEffect(() => {
        if (!linkref.current) return;
        const link = linkref.current;
        link?.addEventListener('mouseover', setPrefetchListener);
        link?.addEventListener('mouseleave', removePrefetchListener);

        return () => {
            link?.removeEventListener('mouseover', setPrefetchListener);
            link?.removeEventListener('mouseleave', removePrefetchListener);
        }
    }, [prefetching])
    return (
        <NextLink ref={linkref} href={href} prefetch={prefetching} {...rest}>{children}</NextLink>
    )
}

export default Link
