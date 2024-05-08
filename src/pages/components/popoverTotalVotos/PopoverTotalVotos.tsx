import { InfoOutlineIcon } from "@chakra-ui/icons";
import { Button, Flex, Image, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverHeader, PopoverTrigger, Text } from "@chakra-ui/react"
import like from "../../../assets/like.svg"
import dislike from "../../../assets/dislike.svg"

interface PopoverTotalVotosProps{
    votosPositivos: number;
    votosNegativos: number;
    idHtmlPauta:string;
}
const PopoverTotalVotos = ({ votosPositivos, votosNegativos, idHtmlPauta }:PopoverTotalVotosProps) => {
    return (
        <Popover>
            <PopoverTrigger>
                <Flex justifyContent={"center"} mt={4} data-testid={`popover-card-votacao-${idHtmlPauta}`}>
                    <Button gap={3}>
                        <InfoOutlineIcon />
                        Votos
                    </Button>
                </Flex>
            </PopoverTrigger>
            <PopoverContent w={36} >
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Votos:</PopoverHeader>
                <PopoverBody>
                    <Flex justifyContent="center" alignItems={"center"} flexDirection={"column"} gap={3}>
                        <Flex alignItems="center">
                            <Image src={like} alt="Like" w={6} mr={2} />
                            <Text fontSize="lg" fontWeight="bold" color="green.500">
                                {votosPositivos}
                            </Text>
                        </Flex>
                        <Flex alignItems="center">
                            <Image src={dislike} alt="Dislike" w={6} mr={2} />
                            <Text fontSize="lg" fontWeight="bold" color="red.500">
                                {votosNegativos}
                            </Text>
                        </Flex>
                    </Flex>
                </PopoverBody>
            </PopoverContent>

        </Popover>
    );
};

export default PopoverTotalVotos;