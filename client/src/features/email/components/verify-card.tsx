'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Header from '@/features/auth/components/header';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { verifyEmail } from '@/features/email/api/use-signup';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

const formSchema = z.object({
    password: z
        .string()
        .min(6, {
            message: 'Mật khẩu phải chứa 6 ký tự trở lên',
        })
        .max(18),
    confirmPassword: z
        .string()
        .min(6, {
            message: 'Mật khẩu phải chứa 6 ký tự trở lên',
        })
        .max(18),
});

export default function VerifyCard({ verifyId }: { verifyId: string }) {
    const t = useTranslations('Verify');

    const { mutate, isPending } = useMutation({
        mutationFn: verifyEmail,
        onSuccess: (data) => {
            toast.success(data.data.data);
        },
        onError: (error: any) => {
            toast.error(error.response.data.data.error);
        },
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        const data = { ...values, verifyId };
        mutate(data);
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center">
            <Header />
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8 w-96"
                >
                    <h1 className="uppercase text-center font-semibold text-2xl">
                        {t('title')}
                    </h1>
                    <div className="flex flex-col gap-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder={t('pass_placonder')}
                                            {...field}
                                        />
                                    </FormControl>

                                    <FormMessage className="absolute text-xs" />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder={t('conf_placonder')}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage className="absolute text-xs" />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {isPending ? (
                            <span>
                                <Loader className="animate-spin" />
                            </span>
                        ) : (
                            <>{t('button')}</>
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
