import { memo, useCallback, useState } from 'react';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import ErrorContext from '~/contexts/error';

const ErrorProvider = memo((props) => {
  const [error, setError] = useState(null);

  const onError = useCallback((error) => {
    setError(error);
    return showMessage(error)
  }, []);

  const contextValue = {
    error,
    onError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {props.children}
      <FlashMessage position='bottom' type='warning' />
    </ErrorContext.Provider>
  );
})

export default ErrorProvider;
