import { Billboard as BillboardType} from "@/types";

interface BillboardProps {
    data: BillboardType | null;
};

const Billboard: React.FC<BillboardProps> = ({ data }) => {
    
    if (!data || Object.keys(data).length === 0) {
        return (
            <div className="p-4 sm:p-6 lg:p-8 rounded-xl bg-gray-200 h-full flex items-center justify-center">
                <span className="text-gray-500">No hay datos disponibles</span>
            </div>
        );
    }

    return (
        <div className="p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden">
            <div
                className="rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover"
                style={{ backgroundImage: `url(${data.imageUrl})` }}
            >
                <div className="h-full w-full flex flex-col justify-center items-center text-center text-red-300 gap-y-8">
                    <div className="font-bold text-3xl sm:text-5xl lg:text-6xl sm:max-w-xl max-w-sm">
                        {data.label || "Etiqueta no disponible"}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Billboard;