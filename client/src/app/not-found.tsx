'use client';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function NotFound() {
    const pathname = usePathname();
    const [langue, setLangue] = useState<'vi' | 'en'>();

    useEffect(() => {
        if (pathname.includes('/en')) {
            setLangue('en');
        }
        if (pathname.includes('/vi')) {
            setLangue('vi');
        }
    }, [pathname]);

    return (
        <div className="hide-scrollbar min-h-screen w-full custom flex justify-center items-center text-primary relative no-copy flex-col gap-5">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="200"
                height="200"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-octagon-alert text-muted-foreground"
            >
                <path d="M12 16h.01" />
                <path d="M12 8v4" />
                <path d="M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z" />
            </svg>
            <div className="text-muted-foreground text-sm font-medium">
                {langue === 'en' ? 'This page does not exist!' : 'Trang này không tồn tại!'}
            </div>
        </div>
    );
}
