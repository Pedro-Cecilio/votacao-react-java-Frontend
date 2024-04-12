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

  return {toastErro};
};

export default useToastPersonalizado;
