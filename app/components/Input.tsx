import React from 'react';

interface InputProps {
    label: string;
    type: string;
    id: string;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: boolean;
    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

export default function Input({ label, type, id,value, className, onChange , onFocus, error}: InputProps) {
    return (
        <div className="mb-4">
            <input
                placeholder={label}
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onFocus={onFocus}
                className={`w-full px-4 py-3 rounded-lg mt-1 text-white bg-input ${className} ${error ? 'border-2 border-error' : ''}`}
                style={{ zIndex: 10, position: 'relative' }}
            />
        </div>
    );
}
