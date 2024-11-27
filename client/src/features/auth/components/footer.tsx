import { Link } from '@/i18n/routing';
import { Copyright, ShieldPlus } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function Footer() {
    const t = useTranslations('Auth');

    return (
        <div className="flex items-center justify-between py-4 text-muted-foreground text-xs">
            <div className="flex items-center gap-2">
                <ShieldPlus size={16} />
                <Link href={'#'} className="hover:text-primary duration-150">
                    {t('sign_in_footer_policy')}
                </Link>
            </div>
            <div className="flex items-center gap-2">
                <Copyright size={16} />
                <span>2024 - {t('sign_in_footer_copyright')}</span>
            </div>
        </div>
    );
}
