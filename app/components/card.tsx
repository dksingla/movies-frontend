import Image from "next/image";

interface CardProps {
    imageSrc: string;
    title: string;
    year: string;
}

export default function Card ({ imageSrc, title, year }:CardProps) {
    return (
        <div className="bg-card rounded-2xl overflow-hidden transform hover:bg-slate-700 transition-transform duration-300 w-[282px] h-[504px] m-3 flex flex-col p-1">
        <div className="flex-grow">
          <Image 
            src={imageSrc} 
            alt={title} 
            width={260} 
            height={504} 
            className="w-full h-full object-cover rounded-3xl pt-3 px-1" 
          />
        </div>
        <div className="p-4">
          <h3 className="text-white text-xl font-bold">{title}</h3>
          <p className="text-gray-400">{year}</p>
        </div>
      </div>
    );
};

