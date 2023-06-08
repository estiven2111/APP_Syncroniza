import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ContextProvider from './components/context/context.js';

import Login from './components/login.js';
import Home from './components/home';

const Stack = createStackNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <ContextProvider>
          <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} options={{headerShown:false}}/>
          </Stack.Navigator>
        </ContextProvider>
      </NavigationContainer>
  );
}