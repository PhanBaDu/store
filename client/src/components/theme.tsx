'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <div>
            {theme === 'dark' ? (
                <Button
                    onClick={() => setTheme('light')}
                    variant={'outline'}
                    size={'icon'}
                >
                    <Sun />
                </Button>
            ) : (
                <Button
                    onClick={() => setTheme('dark')}
                    variant={'outline'}
                    size={'icon'}
                >
                    <Moon />
                </Button>
            )}
        </div>
    );
}
