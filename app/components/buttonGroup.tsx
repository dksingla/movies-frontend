import React from 'react';

interface Prop {
    className?: string;
    type?: 'button' | 'submit' | 'reset'; // To allow specifying the button type
}

const GroupButton: React.FC<Prop> = ({ className, type = 'button' }) => {
    return (
        <div className={`flex sm:flex-row mt-11 ${className}`}>
            <button
                type="button"
                className="bg-background border-white border-2 rounded-xl mb-3 sm:mb-0 mr-5 sm:mr-3 text-white w-[190px] sm:w-[160px] h-[50px]"
            >
                Cancel
            </button>
            <button
                type={type}
                className="bg-primary text-white rounded-xl w-[190px] sm:w-[160px] h-[50px]"
            >
                Submit
            </button>
        </div>
    );
};

export default GroupButton;
