import { Film} from "lucide-react";
import {Search} from "@/app/_components/Search"
import { Moon } from "@/app/_components/Moon";
import { MoonType} from "@/app/layout";      


export const Navigation = ({toggleTheme,theme}:{toggleTheme: ()=> void; theme: MoonType;}) => {
    return (
        <div className="w-[100%] flex justify-between px-5 py-[11.5px]">
            <div className="w-[100%] flex items-center justify-between">
                <h1 className="flex gap-2 italic font-bold text-[16px] text-[#4338CA]">
                    <Film />
                    <span>Movie Z</span>
                </h1>
                <div className="flex gap-3 ">
                    <button className="border rounded-[10px] p-2"><Search theme={theme} /></button>
                    <button className="border rounded-[10px] p-2" onClick={toggleTheme}><Moon theme={theme} /></button>
                </div>
            </div>
        </div>
    );
};
