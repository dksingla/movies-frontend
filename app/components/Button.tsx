interface ButtonProps {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string
}

export default function LoginButton({ text, type , className}: ButtonProps) {
    return (
        <button
            type={type}
            className={`w-${text==='Login'? 'full': ''} px-4 py-4 text-white bg-primary rounded-lg  ${className}`}
        >
            {text}
        </button>
    );
}
