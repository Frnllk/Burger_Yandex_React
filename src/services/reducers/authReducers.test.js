
import { authReducer,initialState } from './authReducers';
import * as types from '../actions';

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(authReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle LOGIN_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.LOGIN_USER,
          data: {
            email: 'email@mail.com',
            password: '123',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'email@mail.com',
        password: '123',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'email@mail.com',
            password: '123',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.LOGIN_USER,
          data: {
            email: 'gmail@mail.com',
            password: '456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'gmail@mail.com',
        password: '456',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });

  it('should handle REGISTER_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.REGISTER_USER,
          data: {
            email: 'email@mail.com',
            password: '123',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'email@mail.com',
        password: '123',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'email@mail.com',
            password: '123',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.REGISTER_USER,
          data: {
            email: 'gmail@mail.com',
            password: '456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'gmail@mail.com',
        password: '456',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });

  it('should handle LOGOUT_USER', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual(initialState);

    expect(
      authReducer(
        {
          user: {
            email: 'email@mail.com',
            password: '123',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.LOGOUT_USER,
        }
      )
    ).toEqual(initialState);
  });

  it('should handle CHEK_TOKEN', () => {
    expect(
      authReducer(
        initialState,
        {
          type: types.CHEK_TOKEN,
          data: {
            email: 'email@mail.com',
            password: '123',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'email@mail.com',
        password: '123',
      },
      accessToken: '',
      isAuthorized: true,
    });

    expect(
      authReducer(
        {
          user: {
            email: 'email@mail.com',
            password: '123',
          },
          accessToken: '',
          isAuthorized: true,
        },
        {
          type: types.CHEK_TOKEN,
          data: {
            email: 'gmail@mail.com',
            password: '456',
          },
        }
      )
    ).toEqual({
      user: {
        email: 'gmail@mail.com',
        password: '456',
      },
      accessToken: '',
      isAuthorized: true,
    });
  });
});