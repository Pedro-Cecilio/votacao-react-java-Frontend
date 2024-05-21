import { AxiosError } from "axios";

export const REGEX_CPF = /^\d{11}$/;

export const tratamentoErroAxios = ({ axiosError, toastErro }: TratamentoErroProps) => {
    if (axiosError.code == "ERR_NETWORK") {
        toastErro("Erro ao conectar com servidor.")
        return;
    }
    const mensagem: string = axiosError.response!.data.erro;
    toastErro(mensagem)
}

interface TratamentoErroProps {
    axiosError: AxiosError<RespostaErro>;
    toastErro: (description: string) => void;
}