export const useTokenLocalStorage = () => {
    const inserirTokenNoLocalStorage = (token:string):void => {
        localStorage.setItem("VOTACAO_TOKEN", token);
    }
    const obterTokenDoLocalStorage = ():string  => {
        return localStorage.getItem("VOTACAO_TOKEN") ?? "";
    }

    return {
        inserirTokenNoLocalStorage,
        obterTokenDoLocalStorage
    }
}