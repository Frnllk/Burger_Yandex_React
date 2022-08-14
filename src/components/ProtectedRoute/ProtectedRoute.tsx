import { FunctionComponent,ReactNode,useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Route, Redirect,RouteProps  } from 'react-router-dom';

import { getUser } from '../../services/actions/authActions';


const ProtectedRoute: FunctionComponent<RouteProps> = ({ children, ...rest }) => {
    
  const dispatch = useDispatch<any>();

  const [isUserLoaded, setUserLoaded] = useState(false);
  const auth = useSelector((store: any) => store.authReducer.isAuthorized);
  

  const init = async () => {
    await dispatch(getUser());
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

export default ProtectedRoute;