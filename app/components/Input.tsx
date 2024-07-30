interface InputProps {
    label: string;
    type: string;
    id: string;
    className?: string;
}

export default function Input({ label, type, id , className}: InputProps) {
    return (
        <div className="mb-4">
            <input
                placeholder={label}
                type={type}
                id={id}
                className={`w-full px-4 py-3 cursor-pointer  rounded-lg mt-1 text-white bg-input ${className}`}
            />
        </div>
    );
}
