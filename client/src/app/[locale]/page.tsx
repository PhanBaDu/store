'use client';

import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
import { Github, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
export default function Home() {
    const t = useTranslations('Wellcome');
    const langue = usePathname();
    const words = t('message');

    const [speakerState, setSpeakerState] = useState('muted');

    const handleSpeaker = () => {
        const audio = document.querySelector('#audioPlayer') as HTMLVideoElement;
        if (speakerState === 'muted') {
            setSpeakerState('unmuted');
            audio.play();
        } else {
            setSpeakerState('muted');
            audio.pause();
        }
    };

    return (
        <div className="hide-scrollbar min-h-screen w-full custom flex justify-center items-center text-primary relative no-copy">
            <div className="w-full h-full font-bold flex flex-col items-center justify-center gap-10 ">
                <TextGenerateEffect
                    duration={2}
                    filter={false}
                    words={words}
                    langue={langue}
                    className="sm:text-7xl text-xl text-center"
                />
            </div>
            <div className="fixed bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <div className="flex justify-center gap-2 items-center w-20 h-[35px] border bg-primary relative rounded-full border-[#cf59e6]">
                    <audio loop id="audioPlayer" autoPlay style={{ display: 'none' }}>
                        <source src="sound/preloader.mp3" type="audio/mp3" />
                    </audio>
                    <div
                        onClick={handleSpeaker}
                        className={`${'speaker__toggle'} ${
                            speakerState === 'muted' ? `${'speaker__toggle--anim'}` : ``
                        }`}
                    >
                        &nbsp;
                    </div>
                    <X className="text-muted size-4" />
                    <div className="speaker__unmuted">
                        <svg
                            className="-mb-[1px]"
                            width={'14'}
                            height={'12'}
                            viewBox="0 0 15 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                x="0.999976"
                                y1="1.06665"
                                width="1.4"
                                height="10"
                                fill="#f2f2f2"
                                className="rect1-anim"
                            />
                            <rect
                                x="9.8"
                                y1="1.06665"
                                width="1.4"
                                height="10"
                                fill="#f2f2f2"
                                className="rect2-anim"
                            />
                            <rect
                                x="3.899994"
                                y1="1.06665"
                                width="1.4"
                                height="10"
                                fill="#f2f2f2"
                                className="rect3-anim"
                            />
                            <rect
                                x="6.899994"
                                y1="1.06665"
                                width="1.4"
                                height="10"
                                fill="#f2f2f2"
                                className="rect4-anim"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex gap-5">
                    <Link
                        href={'https://github.com/PhanBaDu'}
                        className="flex gap-2 text-muted-foreground"
                    >
                        <div className="border border-[#cf59e6] rounded-full p-2">
                            <Github className="size-5 text-[#cf59e6]" />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
