import * as router from 'react-router'



export const useNavigateMock = (jestfn: jest.Mock = jest.fn()): jest.Mock => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => jestfn);
    return jestfn;
}