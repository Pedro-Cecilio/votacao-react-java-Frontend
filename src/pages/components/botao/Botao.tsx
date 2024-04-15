import { Button, ResponsiveValue } from "@chakra-ui/react"
import { MouseEventHandler} from "react";
interface BotaoProps{
    onClick:MouseEventHandler<HTMLButtonElement>;
    tamanho: ResponsiveValue<string> | undefined;
    texto: string;
    isLoading?: boolean;
}
const Botao = ({onClick, tamanho, texto, isLoading}:BotaoProps) => {
    return (
        <Button isLoading={isLoading} onClick={onClick} bg={"cinza.700"} color={"branco"} size={tamanho} _hover={{ backgroundColor: "cinza.800" }}>
            {texto}
        </Button>
    )
}

export default Botao;