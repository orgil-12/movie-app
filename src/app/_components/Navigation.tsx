import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Film} from "lucide-react";
import {Search} from "@/components/ui/Search"
import { Moon } from "@/components/ui/Moon";

type Props = {
    setTheme : void,
    theme: string,
  }

export const Navigation = ({ setTheme }: { setTheme: (theme: string) => void }) => {
    return (
        <div className="w-[100%] flex justify-between px-5 py-[11.5px]">
            <div className="w-[100%] flex items-center justify-between">
                <h1 className="flex gap-2 italic font-bold text-[16px] text-[#4338CA]">
                    <Film />
                    <span>Movie Z</span>
                </h1>
                <div className="flex gap-3 ">
                    <button className="border rounded-[10px] p-2"><Search /></button>
                    <button className="border rounded-[10px] p-2" onClick={() => { setTheme("dark") }}><Moon /></button>
                </div>
            </div>
        </div>
    );
};
