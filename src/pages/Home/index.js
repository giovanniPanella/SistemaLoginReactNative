import {Text,View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'


export default function Home(){

    //armaena as informações do Usuário
    const [token, setToken] = useState('')
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    
    
    //funcao para recuperar os dados no AsyncStorage
    const getToken = async()=>{
        const valToken = await AsyncStorage.getItem('@token');
        const valName = await AsyncStorage.getItem('@name');
        const valEmail = await AsyncStorage.getItem('@email');
        setToken(valToken)
        setName(valName)
        setEmail(valEmail)
    }
    //Executar quando o usuario acessar a tela e chamar a função getToken
    useEffect(()=>{
        getToken();
    },[])

    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text >Home</Text>
            <Text>Token: {token}</Text>
            <Text>Nome: {name}</Text>
            <Text>E-mail:{email}</Text>

            
            
        </View>
    )
}