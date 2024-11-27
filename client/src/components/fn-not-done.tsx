import { TvMinimal } from 'lucide-react';

export default function FnNotDone() {
    return (
        <div className="bg-custom flex justify-center items-center min-h-screen flex-col text-muted-foreground">
            <div className="relative">
                <TvMinimal className="size-96"></TvMinimal>
                <h1 className="text-lg absolute top-[40%] translate-y-[-40%] left-[50%] translate-x-[-50%]">
                    CHƯA LÀM
                </h1>
            </div>
        </div>
    );
}
