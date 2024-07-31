'use client';

import { Icon } from "@iconify/react/dist/iconify.js";
import Input from "../components/Input";
import GroupButton from "../components/buttonGroup";

export default function EditMovie() {
    return (
        <div className="min-h-screen m-4 sm:p-12 flex flex-col justify-between">
        <div>
            <h2 className="text-3xl sm:text-5xl font-medium text-white mb-6">Edit</h2>
            
            <div className="flex flex-col sm:flex-row gap-6 sm:gap-13 pt-0 sm:pt-12">
                <div className="order-2 sm:order-1 w-full sm:w-[473px] h-[300px] sm:h-[504px] bg-input rounded-2xl border-2 border-dashed border-white flex flex-col items-center justify-center">
                    <Icon className="text-white text-2xl ml-2" icon="material-symbols:download" />
                    <h4 className="text-white font-thin">Drop other image here</h4>
                </div>
                
                <div className="sm:order-2 flex flex-col gap-6">
                    <div className="order-1 sm:order-none">
                        <Input label="Title" type="text" id="title" className="w-full sm:w-[360px] mb-4" />
                        <Input label="Publishing year" type="text" id="year" className="w-full sm:w-[200px] mb-4" />
                    </div>
                    <div className="order-3 sm:order-none">
                        <GroupButton />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
