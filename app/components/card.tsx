import Image from "next/image";

interface CardProps {
    imageSrc: string;
    title: string;
    year: string;
}

export default function Card ({ imageSrc, title, year }:CardProps) {
    return (
        <div className="bg-dark-blue shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
            <Image src={imageSrc} alt={title} width={300} height={450} className="w-full h-48 object-cover p-1" />
            <div className="p-4">
                <h3 className="text-white text-xl font-bold">{title}</h3>
                <p className="text-gray-400">{year}</p>
            </div>
        </div>
    );
};

