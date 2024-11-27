'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export const HoverEffect = ({
    items,
    className,
}: {
    items: {
        title: string;
        description: string;
        link: string;
        price: string;
    }[];
    className?: string;
}) => {
    let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                'grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3',
                className,
            )}
        >
            {items.map((item, idx) => (
                <Link
                    href={item?.link}
                    key={item?.link}
                    className="relative group block p-2 h-full w-full"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-primary block rounded-lg"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.05 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.05, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    <Card className="border border-muted-foreground">
                        <CardImage
                            link="/test.jpeg"
                            alt="item"
                            className="w-full h-52"
                        />
                        <div className="p-2">
                            <CardTitle>{item.title}</CardTitle>
                            <CardDescription className="">
                                {item.description}
                                <p className="text-[#e11d48] flex gap-1 font-bold">
                                    <span className="underline">đ</span>
                                    {item.price}
                                </p>
                            </CardDescription>
                        </div>
                    </Card>
                </Link>
            ))}
        </div>
    );
};

export const Card = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <div
            className={cn(
                'rounded-lg h-full w-full overflow-hidden bg-primary-foreground border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20',
                className,
            )}
        >
            <div className="relative z-50">
                <div className="">{children}</div>
            </div>
        </div>
    );
};
export const CardTitle = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <h4 className={cn('text-sm font-bold tracking-wide', className)}>
            {children}
        </h4>
    );
};

export const CardImage = ({
    className,
    link,
    alt,
}: {
    className?: string;
    link: string;
    alt: string;
}) => {
    return (
        <Image
            src={link}
            alt={alt}
            width={200}
            height={200}
            className={cn(className)}
        ></Image>
    );
};
export const CardDescription = ({
    className,
    children,
}: {
    className?: string;
    children: React.ReactNode;
}) => {
    return (
        <p
            className={cn(
                'text-muted-foreground tracking-wide leading-relaxed text-xs',
                className,
            )}
        >
            {children}
        </p>
    );
};
