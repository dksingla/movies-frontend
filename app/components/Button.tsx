interface ButtonProps {
    text: string;
    type: "button" | "submit" | "reset";
    className?: string;
    onClick?: () => void; 
}

export default function LoginButton({ text, type , onClick, className}: ButtonProps) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={`w-${text==='Login'? 'full': ''} px-4 py-4 text-white bg-primary rounded-lg  ${className}`}
        >
            {text}
        </button>
    );
}
