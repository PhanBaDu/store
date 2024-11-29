import VerifyCard from '@/features/email/components/verify-card';

interface VerifyEmailParams {
    params: {
        verifyId: string;
    };
}

export default function VerifyEmail({
    params: { verifyId },
}: VerifyEmailParams) {
    return <VerifyCard verifyId={verifyId} />;
}
