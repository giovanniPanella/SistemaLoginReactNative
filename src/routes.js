import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import Login from './pages/Login';
import NewUser from './pages/NewUser';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';

export default function Routes() {
    return (
        // Agrupar as rotas
        <NavigationContainer independent={true}>
            {/* Criar uma pilha de páginas */}
            <Stack.Navigator>
                {/* Carregar as telas */}
                <Stack.Screen 
                    name='Login' 
                    component={Login} 
                    options={{headerShown: false }} 
                />
                <Stack.Screen name='NewUser' component={NewUser} options={{headerShown: false }}  />
                <Stack.Screen name='RecoverPassword' component={RecoverPassword} options={{headerShown: false }}  />
                <Stack.Screen name='Home' component={Home} options={{headerShown: true }}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}