import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { memo } from 'react';
import { ColorSchemeName } from 'react-native';
import ErrorProvider from '~/providers/error';

import LinkingConfiguration from './LinkingConfiguration';
import RootNavigator from './RootNavigator';

const Navigation = memo(({ colorScheme }: { colorScheme: ColorSchemeName }) => {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ErrorProvider>
        <RootNavigator />
      </ErrorProvider>
    </NavigationContainer>
  );

})

export default Navigation;
