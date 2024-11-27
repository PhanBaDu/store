'use client';

import Image from 'next/image';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useLocale, useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    BellRing,
    CircleHelp,
    Languages,
    PlugZap,
    ScanFace,
    Search,
    ShoppingBag,
    Store,
    UserPlus,
    UserRoundPen,
} from 'lucide-react';
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from '@/components/ui/hover-card';

export default function AppHeader() {
    const localActive = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations('AppHeader');

    const changeLanguage = (locale: string) => {
        if (localActive !== locale) {
            router.replace(pathname, { locale: locale });
        }
    };

    return (
        <div className="z-[99] fixed top-0 left-0 right-0 backdrop-blur-xl bg-background/90 border-b py-2 border-muted ">
            <div className="flex flex-col max-w-6xl mx-auto gap-2">
                {/* navbar link */}
                <div className="w-full mx-auto flex justify-between items-center px-2 lg:px-0 gap-5 text-xs">
                    {/* navbar left */}
                    <div className="flex-1 flex justify-start gap-6">
                        <Link
                            href={'/seller/sign-in'}
                            className="relative flex"
                        >
                            <Button
                                variant={'link'}
                                className="text-xs p-0 after:content-['|'] after:absolute after:-right-4 after:top-[50%] after:text-muted-foreground after:translate-y-[-50%]"
                            >
                                <span>{t('left_title-1')}</span>
                                <Store />
                            </Button>
                        </Link>
                        <Link href={'/seller/sign-up'} className="relative">
                            <Button
                                variant={'link'}
                                className="text-xs p-0 after:content-['|'] after:absolute after:-right-4 after:top-[50%] after:text-muted-foreground after:translate-y-[-50%]"
                            >
                                <span>{t('left_title-2')}</span>
                                <UserRoundPen />
                            </Button>
                        </Link>
                        <Link
                            href={
                                'https://www.facebook.com/profile.php?id=61560170980112'
                            }
                            className=""
                        >
                            <Button variant={'link'} className="text-xs p-0">
                                <span>{t('left_title-3')}</span>
                                <PlugZap />
                            </Button>
                        </Link>
                    </div>
                    {/* navbar right */}
                    <div className="flex-1 flex justify-end gap-6 items-center">
                        <Link href={'/notification'} className="relative">
                            <Button
                                variant={'link'}
                                className="text-xs p-0 after:content-['|'] after:absolute after:-right-4 after:top-[50%] after:text-muted-foreground after:translate-y-[-50%]"
                            >
                                <span>{t('right_title-1')}</span> <BellRing />
                            </Button>
                        </Link>
                        <Link href={'/support'} className="relative">
                            <Button
                                variant={'link'}
                                className="text-xs p-0 after:content-['|'] after:absolute after:-right-4 after:top-[50%] after:text-muted-foreground after:translate-y-[-50%]"
                            >
                                <span>{t('right_title-2')}</span> <CircleHelp />
                            </Button>
                        </Link>
                        <HoverCard>
                            <HoverCardTrigger className="flex text-xs p-0 items-center gap-2">
                                <span>
                                    {localActive === 'en'
                                        ? `${t('right_title-3', {
                                              langue: 'English',
                                          })}`
                                        : `${t('right_title-3', {
                                              langue: 'Tiếng việt',
                                          })}`}
                                </span>
                                <Languages className="text-primary size-4" />
                            </HoverCardTrigger>
                            <HoverCardContent className="flex flex-col p-0 mt-3 w-44 text-xs">
                                <button
                                    className="text-left hover:bg-muted p-3 cursor-pointer"
                                    onClick={() => changeLanguage('vi')}
                                >
                                    Tiếng việt
                                </button>
                                <button
                                    onClick={() => changeLanguage('en')}
                                    className="text-left hover:bg-muted p-3"
                                >
                                    English
                                </button>
                            </HoverCardContent>
                        </HoverCard>
                        <Link href={'/sign-up'} className="relative">
                            <Button
                                variant={'link'}
                                className="text-xs p-0 after:content-['|'] after:absolute after:-right-4 after:top-[50%] after:text-[#e11d48] after:translate-y-[-50%] text-[#e11d48] font-bold"
                            >
                                <span>{t('right_title-4')}</span>
                                <UserPlus />
                            </Button>
                        </Link>
                        <Link href={'/sign-in'}>
                            <Button
                                variant={'link'}
                                className="text-xs p-0 text-[#e11d48] font-bold"
                            >
                                <span>{t('right_title-5')}</span>
                                <ScanFace />
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* navbar search */}
                <div className="w-full mx-auto flex justify-between items-center px-2 lg:px-0 gap-5">
                    <Link
                        href={'/app'}
                        className="w-40 flex items-center gap-1"
                    >
                        <Image
                            src="/png/background.png"
                            alt="Logo"
                            width={40}
                            height={40}
                        ></Image>
                        <h1 className="text-xl font-semibold uppercase text-[#e11d48]">
                            Monney
                        </h1>
                    </Link>
                    <div className="flex-1 flex items-center gap-1 justify-center relative border rounded-lg p-1">
                        <Input
                            className="bg-transparent shadow-none placeholder:text-xs text-primary border-none"
                            placeholder="Tìm kiếm..."
                        ></Input>
                        <Button className="w-16">
                            <Search />
                        </Button>
                    </div>
                    <div className="w-20 flex items-center justify-end text-muted-foreground">
                        <ShoppingBag className="cursor-pointer text-[#e11d48]" />
                    </div>
                </div>
            </div>
        </div>
    );
}
