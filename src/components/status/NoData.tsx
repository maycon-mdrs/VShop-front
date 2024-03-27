import { useTheme } from "@/components/theme-provider";
import { WarningLight } from "@/components/unDraw/WarningLight";
import { WarningDark } from "@/components/unDraw/WarningDark";

export function NoDATA() {
    const { effectiveTheme } = useTheme();
    const WarningComponent = effectiveTheme === 'light' ? WarningDark : WarningLight;

    return (
        <div className="flex flex-col items-center justify-center">
            <WarningComponent width={'100%'} height={'100%'} className=" max-w-md" />
            <h2 className="mt-8 text-lg md:text-3xl font-semibold tracking-tight first:mt-0">
                Não há dados disponíveis ainda.
            </h2>
        </div>
    );
}
