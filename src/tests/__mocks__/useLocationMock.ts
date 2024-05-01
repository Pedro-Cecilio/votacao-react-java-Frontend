import * as router from 'react-router';

export const useLocationMock = (pathname:string) => {
    jest.spyOn(router, 'useLocation').mockReturnValue({
        pathname: pathname,
        state: {},
        key: '',
        search: '',
        hash: ''
    })
}