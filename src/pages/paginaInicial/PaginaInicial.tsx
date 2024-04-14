import { Button, Flex } from "@chakra-ui/react";
import { useDadosUsuarioStore } from "../../hooks/useDadosUsuarioStore";

const PaginaInicial = () => {
    const { admin } = useDadosUsuarioStore();
    return (
        <Flex justifyContent="center" alignItems="center" flexDirection="row" gap={16} h="100%" bg={'cinza.50'}>
            {admin ? (
                <>
                    <Button bg={"cinza.700"} color={"branco"} size={'lg'} _hover={{ backgroundColor: "cinza.800" }}>
                        Ver pautas criadas
                    </Button>
                    <Button bg={"cinza.700"} color={"branco"} size={'lg'} _hover={{ backgroundColor: "cinza.800" }}>
                        Criar nova pauta
                    </Button>
                </>
            ) :
                <>
                    <Button bg={"cinza.700"} color={"branco"} size={'lg'} _hover={{ backgroundColor: "cinza.800" }}>
                        Sessões de votação abertas
                    </Button>
                    <Button bg={"cinza.700"} color={"branco"} size={'lg'} _hover={{ backgroundColor: "cinza.800" }}>
                        Meus votos
                    </Button>
                </>
            }
        </Flex>
    );
};

export default PaginaInicial;
