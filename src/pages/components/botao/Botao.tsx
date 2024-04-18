import { Button, ResponsiveValue } from "@chakra-ui/react"
import { MouseEventHandler} from "react";
interface BotaoProps{
    onClick:MouseEventHandler<HTMLButtonElement>;
    tamanho: ResponsiveValue<string> | undefined;
    texto: string;
    isLoading?: boolean;
    rightIcon?: React.ReactElement
    disabled?: boolean
}
const Botao = ({onClick, tamanho, texto, isLoading, rightIcon, disabled}:BotaoProps) => {
    return (
        <Button isLoading={isLoading} onClick={onClick} bg={"cinza.700"} color={"branco"} size={tamanho} _hover={{ backgroundColor: "cinza.800" }} rightIcon={rightIcon} disabled={disabled}>
            {texto}
        </Button>
    )
}

export default Botao;