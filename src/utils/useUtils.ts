export const useUtils = () => {
    const inserirTokenNoLocalStorage = (token:string):void => {
        localStorage.setItem("VOTACAO_TOKEN", token);
    }
    const obterTokenDoLocalStorage = ():string | null => {
        return localStorage.getItem("VOTACAO_TOKEN");
    }

    return {
        inserirTokenNoLocalStorage,
        obterTokenDoLocalStorage
    }
}