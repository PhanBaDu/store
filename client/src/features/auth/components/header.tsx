import { ModeToggle } from '@/components/theme';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default function Header() {
    return (
        <div className="fixed top-0 left-0 right-0 py-4 border-b border-muted text-[#e11d48]">
            <div className="max-w-6xl mx-auto flex justify-between items-center px-2 lg:px-0">
                <Link href={'/app'} className="flex items-center gap-1">
                    <Image
                        src="/png/background.png"
                        alt="Logo"
                        width={40}
                        height={40}
                    ></Image>
                    <h1 className="text-xl font-semibold uppercase">Monney</h1>
                </Link>
                <div className="flex items-center text-primary">
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
