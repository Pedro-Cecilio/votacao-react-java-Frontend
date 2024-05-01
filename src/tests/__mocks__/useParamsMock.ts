import * as router from 'react-router'

export const useParamsMock = (id:string)=>{
    jest.spyOn(router, "useParams").mockReturnValue({
        id: id
    })
}