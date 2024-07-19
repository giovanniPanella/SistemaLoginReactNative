// useState - Adicionar estado ao componente
// useEffect - Criar efeitos colaterais em componentes funcionais
import { useEffect, useState } from 'react';

// Incluir os componentes utilizado para estruturar o conteúdo
import { Alert, Text, View } from 'react-native';

// Incluir a função navegar entre as telas
import { useNavigation } from '@react-navigation/native';

// Incluir AsyncStorage para armazenar dados
import AsyncStorage from '@react-native-async-storage/async-storage';

import { getValToken } from '../../services/auth';

// Criar e exportar a função com a tela home 
export default function Home() {

    // Navegar entre as telas
    const navigation = useNavigation();

    // Armazenar as informações do usuário
    const [token, setToken] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    // Função recuperar o valor que está em AsyncStorage
    const getToken = async () => {

        try {
            const valToken = await getValToken();

            if (valToken === null) {
                Alert.alert("Ops", "Erro: Necessário realizar o login para acessar a página!");
                
                navigation.navigate('Login');
            } else {
                const valName = await AsyncStorage.getItem('@name');
                const valEmail = await AsyncStorage.getItem('@email');
                setToken(valToken);
                setName(valName);
                setEmail(valEmail);
            }
        } catch (err) {
            Alert.alert("Ops", "Erro: Necessário realizar o login para acessar a página!");
                
            navigation.navigate('Login');
        }

    }

    // Executar quando o usuário acessar a tela e chamar a função getToken
    useEffect(() => {
        getToken();
    }, []);


    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text >Home</Text>
            <Text>Token: {token}</Text>
            <Text>Nome: {name}</Text>
            <Text>E-mail:{email}</Text>

            
            
        </View>
    )
}