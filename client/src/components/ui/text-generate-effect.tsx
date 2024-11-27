'use client';
import { useEffect } from 'react';
import { motion, stagger, useAnimate } from 'framer-motion';
import { cn } from '@/lib/utils';
import { MousePointerClick } from 'lucide-react';
import { Link } from '@/i18n/routing';

export const TextGenerateEffect = ({
    words,
    className,
    filter = true,
    duration = 0.5,
    langue,
}: {
    words: string;
    className?: string;
    filter?: boolean;
    duration?: number;
    langue: string;
}) => {
    const [scope, animate] = useAnimate();
    const wordsArray = words.split(' ');
    useEffect(() => {
        animate(
            'span',
            {
                opacity: 1,
                filter: filter ? 'blur(0px)' : 'none',
            },
            {
                duration: duration ? duration : 1,
                delay: stagger(0.2),
            },
        );
    }, [scope.current]);

    const renderWords = () => {
        return (
            <motion.div ref={scope}>
                {wordsArray.map((word, idx) => {
                    return (
                        <motion.span
                            key={word + idx}
                            className="dark:text-white text-black opacity-0 uppercase"
                            style={{
                                filter: filter ? 'blur(10px)' : 'none',
                            }}
                        >
                            {langue === '/en' && (
                                <>
                                    {word === 'e-commerce' && (
                                        <span className="header__hero--heading-gradient block">
                                            {word}{' '}
                                        </span>
                                    )}
                                    {word !== 'e-commerce' &&
                                        word !== 'view-project' &&
                                        `${word}${' '}`}
                                    {word === 'view-project' && (
                                        <Link
                                            className="underline flex justify-center items-center gap-1 text-sm duration-300 mt-8 text-primary font-bold hover:text-[#cf59e6]"
                                            href={'/app'}
                                        >
                                            {word.split('-').map((e, i) => (
                                                <p key={i}>{e}</p>
                                            ))}
                                            <MousePointerClick />
                                        </Link>
                                    )}
                                </>
                            )}
                            {langue === '/vi' && (
                                <>
                                    {word !== 'thương-mại-điện-tử' && word !== 'xem-dự-án' && (
                                        <span>{word} </span>
                                    )}
                                    {word === 'thương-mại-điện-tử' && (
                                        <div>
                                            {word.split('-').map((e, i) => (
                                                <span
                                                    className="header__hero--heading-gradient"
                                                    key={i}
                                                >
                                                    {e}{' '}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    {word === 'xem-dự-án' && (
                                        <Link
                                            className="underline flex justify-center items-center gap-1 text-sm duration-300 mt-8 text-primary font-bold hover:text-[#cf59e6]"
                                            href={'/app'}
                                        >
                                            {word.split('-').map((e, i) => (
                                                <p key={i}>{e}</p>
                                            ))}
                                            <MousePointerClick />
                                        </Link>
                                    )}
                                </>
                            )}
                        </motion.span>
                    );
                })}
            </motion.div>
        );
    };

    return (
        <div className={cn('font-bold', className)}>
            <div className="mt-4">
                <div className=" dark:text-white text-black leading-snug tracking-wide">
                    {renderWords()}
                </div>
            </div>
        </div>
    );
};
