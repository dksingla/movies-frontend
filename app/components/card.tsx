import Image from "next/image";

interface CardProps {
    imageSrc: string;
    title: string;
    year: string;
}

export default function Card ({ imageSrc, title, year }:CardProps) {
    return (
      <div className="bg-card rounded-2xl overflow-hidden transform hover:bg-hover transition-transform duration-300 w-[180px] sm:w-[292px] sm:h-[504px] h-[330px] m-3 flex flex-col p-1">
  
        <div className="flex-grow">
          <Image 
            src={imageSrc} 
            alt={title} 
            width={180} 
            height={246} 
            className="w-full h-full object-cover rounded-t-2xl sm:rounded-b-2xl sm:pt-2 sm:px-1" 
          />
        </div>
        <div className="p-4">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm">{year}</p>
        </div>
      </div>
    );
};

