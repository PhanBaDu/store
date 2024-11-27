import { HoverEffect } from '@/components/ui/card-hover-effect';
import Image from 'next/image';

interface ItemType {
    title: string;
    description: string;
    link: string;
    price: string;
}

export default function Products() {
    const listTest: ItemType[] = [
        {
            title: 'item',
            description: 'item',
            link: '#',
            price: '25.000',
        },
        {
            title: 'item',
            description: 'item',
            link: '#',
            price: '25.000',
        },
        {
            title: 'item',
            description: 'item',
            link: '#',
            price: '25.000',
        },
        {
            title: 'item',
            description: 'item',
            link: '#',
            price: '25.000',
        },
        {
            title: 'item',
            description: 'item',
            link: '#',
            price: '25.000',
        },
    ];

    return (
        <div className="w-full">
            {/* <div className="border rounded-lg overflow-hidden">
                <Image
                    src={'/test.jpeg'}
                    alt="test"
                    width={177}
                    height={208}
                    className="w-full h-48 object-cover"
                />
                <div className="p-2">
                    <p>item</p>
                    <span className="text-[#e11d48] flex gap-1 font-bold">
                        <span className="underline">đ</span>25.000
                    </span>
                </div>
            </div> */}
            <HoverEffect items={listTest} className="xl:grid-cols-5 gap-2" />
        </div>
    );
}
