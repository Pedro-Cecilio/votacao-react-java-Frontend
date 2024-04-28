import * as router from 'react-router'



export const useNavigateMock = (jestfn: jest.Mock<any, any, any> = jest.fn()): jest.Mock<any, any, any> => {
    jest.spyOn(router, 'useNavigate').mockImplementation(() => jestfn);
    return jestfn;
}