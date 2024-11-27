import Footer from '@/features/auth/components/footer';
import Header from '@/features/auth/components/header';

export default async function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="w-full">
            <div className="min-h-screen flex flex-col justify-between max-w-6xl mx-auto px-2 lg:px-0">
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
}
