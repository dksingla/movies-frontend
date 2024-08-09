import React from 'react';
import { useRouter } from 'next/navigation';

interface Prop {
    className?: string;
    type?: 'button' | 'submit' | 'reset';
    loading?: boolean;
}

const GroupButton: React.FC<Prop> = ({ className, type = 'button', loading = false }) => {
    const router = useRouter();

    const handleCancel = () => {
        router.back();
    };

    return (
        <div className={`flex sm:flex-row sm:mt-11 ${className}`}>
            <button
                type="button"
                className="bg-background border-white border-2 rounded-xl mb-3 sm:mb-0 mr-5 sm:mr-3 text-white w-[160px]  h-[50px]"
                onClick={handleCancel}
            >
                Cancel
            </button>
            <button
                type={type}
                className="bg-primary text-white rounded-xl w-[160px]  h-[50px] relative"
                disabled={loading}
            >
                {loading ? (
                    <>
                        <span className="invisible">Submit</span>
                        <span className="absolute inset-0 flex items-center justify-center">
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </span>
                    </>
                ) : (
                    'Submit'
                )}
            </button>
        </div>
    );
};

export default GroupButton;