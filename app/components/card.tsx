import Image from "next/image";
import Link from 'next/link';

interface CardProps {
  id: number;
  imageSrc: string;
  title: string;
  year: string;
}

export default function Card({ id, imageSrc, title, year }: CardProps) {
  return (
    <div className="bg-card rounded-2xl overflow-hidden transform hover:bg-hover transition-transform duration-300  m-3 flex flex-col p-1">
      <div className="flex-grow">
        <img
          src={imageSrc}
          alt={title}
          width={180}
          height={246}
          className="w-full h-full object-cover rounded-t-2xl sm:rounded-b-2xl sm:pt-2 sm:px-1"
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="p-4">
          <h3 className="text-white text-xl font-semibold">{title}</h3>
          <p className="text-gray-400 text-sm">{year}</p>
        </div>
        <Link href={`/editmovie/${id}`} passHref>
          <button className="m-4 font-semibold text-xl text-cyan-400">
            Edit
          </button>
        </Link>
      </div>
    </div>
  );
}