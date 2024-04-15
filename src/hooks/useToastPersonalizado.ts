import { useToast } from "@chakra-ui/react";

const useToastPersonalizado = () => {
  const toast = useToast();

  const toastErro = (description: string) => {
    toast({
      title: "Erro",
      description: description,
      status: "error",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    })
  };
  const toastSucesso = (description: string) => {
    toast({
      title: "Sucesso",
      description: description,
      status: "success",
      duration: 3000,
      isClosable: true,
      position: "top-right"
    })
  };

  return { toastErro, toastSucesso };
};

export default useToastPersonalizado;
