interface prop{
    className?: string;
}
export default function GroupButton ({className}:prop){
    return(
        <div className={`flex  sm:flex-row mt-11 ${className}`}>
        <button className="bg-background border-white border-2 rounded-xl mb-3 sm:mb-0 mr-5 sm:mr-3 text-white w-[190px] sm:w-[160px] h-[50px]">Cancel</button>
        <button className="bg-primary text-white rounded-xl w-[190px] sm:w-[160px] h-[50px]">Submit</button>
    </div>
    )
}