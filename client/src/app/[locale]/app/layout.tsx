import AppHeader from '@/features/app/components/header';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-2 lg:px-0">
                <AppHeader />
                <div className="mt-36">{children}</div>
            </div>
        </div>
    );
}
