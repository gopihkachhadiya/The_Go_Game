/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import {name as appName} from './app.json';
import App from './App';

AppRegistry.registerComponent(appName, () => App);

if (Platform.OS === 'web') {
  const rootTag =
    document.getElementById('root') || document.getElementById('app');
  AppRegistry.runApplication(appName, {initialProps: {}, rootTag});
}
