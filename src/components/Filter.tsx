import { useSearchParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function Filter() {
    const [_, setSearchParams] = useSearchParams();
    const inputRef = useRef<HTMLInputElement>(null); // Referência ao elemento de input

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

    // Função para limpar a busca
    const clearSearch = () => {
        setSearchParams(new URLSearchParams());
        if (inputRef.current) {
            inputRef.current.value = ""; // Limpa o valor do input
        }
    };

    return (
        <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center gap-2 justify-between md:justify-start w-full">
                {/* Search by title */}
                <Input
                    placeholder="Search by title"
                    className="max-w-[180px]"
                    type="text"
                    onChange={(e) => { handleFilterInput(e.target.value); }}
                    ref={inputRef} 
                />
                <Button variant="secondary" onClick={clearSearch}>X</Button>
            </div>
        </div>
    );
}
