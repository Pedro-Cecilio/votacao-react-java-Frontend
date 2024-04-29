import * as ReactRouter from 'react-router';

export const useLocationMock = (pathname:string) => {
    jest.spyOn(ReactRouter, 'useLocation').mockReturnValue({
        pathname: pathname,
        state: {},
        key: '',
        search: '',
        hash: ''
    })
}