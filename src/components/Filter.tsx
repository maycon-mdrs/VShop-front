import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";

export function Filter() {
    const [_, setSearchParams] = useSearchParams();

    /**
     * Atualiza o parâmetro de pesquisa 'title' na URL.
     * @param {string} title Título pelo qual filtrar.
     */
    function handleFilterInput(title: string) {
        setSearchParams(state => {
            if (title) {
                state.set('title', title);
            } else {
                state.delete('title')
            }
            return state;
        });
    }

    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2 justify-between md:justify-start w-full">

                {/* Pesquisar por título */}
                <Input placeholder="Pesquisar pelo título" className="max-w-[180px]" type="text" onChange={(e) => { handleFilterInput(e.target.value); }} />
            </div>
        </div>
    );
}
