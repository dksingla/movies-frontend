interface ButtonProps {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string
}

export default function LoginButton({ text, type , className}: ButtonProps) {
    return (
        <button
            type={type}
            className={`w-full px-4 py-4 text-white bg-green-500 rounded-lg hover:bg-green-600 ${className}`}
        >
            {text}
        </button>
    );
}
