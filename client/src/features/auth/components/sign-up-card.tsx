'use client';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { FcGoogle } from 'react-icons/fc';
import { FaFacebook } from 'react-icons/fa';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { TextGenerateEffectCustom } from '@/components/ui/text-generate-custom';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';
import { ChevronRight, Loader } from 'lucide-react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useMutation } from '@tanstack/react-query';
import { signup } from '@/features/auth/api/use-signup';

const formSchema = z.object({
    email: z.string().min(6, {
        message: 'Email phải có ít nhất 6 ký tự.',
    }),
});

export default function SignUpCard() {
    const { mutate, isPending } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            if (data.status === 201) {
                toast.success(t('api_signup_success'));
            } else {
                toast.success(data.data.data);
            }
        },
        onError: (error: any) => {
            if (error.status === 409) {
                toast.error(t('api_signup_error'));
            } else {
                toast.error(error.response.data.data.error);
            }
        },
    });

    const t = useTranslations('Auth');
    const words_heading = t('sign_in_heading');

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
        },
    });

    function onSubmit(data: z.infer<typeof formSchema>) {
        mutate(data);
    }

    return (
        <div className="flex-1 flex justify-between items-center">
            <div className="flex">
                <Image
                    className="absolute top-[15%] translate-y-[-15%] left-52 -z-[100]"
                    src="/png/background.png"
                    alt="Logo"
                    width={500}
                    height={500}
                ></Image>
                <h1 className="text-5xl font-semibold uppercase text-[#e11d48] flex items-baseline gap-2">
                    Monney{' '}
                    <span className="text-base text-[#e11d48]">
                        <TextGenerateEffectCustom
                            duration={0.3}
                            className="text-[#e11d48] dark:text-[#e11d48]"
                            words={words_heading}
                        />
                    </span>
                </h1>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center uppercase">
                        <h1 className="text-xl">{t('sign_up_title')}</h1>
                        <TextGenerateEffectCustom
                            duration={0.3}
                            words={`${t('sign_up_description')}`}
                            className="text-xs text-muted-foreground dark:text-muted-foreground"
                        />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6 w-96"
                        >
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                placeholder="Email..."
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage className="absolute text-xs" />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                className="w-full flex items-center"
                            >
                                {isPending ? (
                                    <span>
                                        <Loader className="animate-spin" />
                                    </span>
                                ) : (
                                    <>
                                        <span>{t('sign_up_action')}</span>

                                        <ChevronRight />
                                    </>
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
                <CardFooter>
                    <div className="w-full flex flex-col gap-4">
                        <div className="flex items-center gap-2">
                            <Separator className="flex-1" />
                            <span className="text-muted-foreground text-xs">
                                {t('sign_in_or')}
                            </span>
                            <Separator className="flex-1" />
                        </div>
                        <div className="flex gap-2">
                            <Button type="button" className="flex-1">
                                <FcGoogle />
                                <span>Google</span>
                            </Button>
                            <Button type="button" className="flex-1">
                                <FaFacebook className="text-sky-500" />
                                <span>Facebook</span>
                            </Button>
                        </div>
                        <div className="flex justify-center text-xs text-muted-foreground mt-5">
                            <Link href={'/sign-in'}>
                                {t('sign_up_link')}{' '}
                                <span className="text-sky-500 underline">
                                    {t('sign_up_href')}
                                </span>
                            </Link>
                        </div>
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}
