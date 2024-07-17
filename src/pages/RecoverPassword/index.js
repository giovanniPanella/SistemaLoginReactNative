import {Text,View} from 'react-native'
import {useNavigation} from '@react-navigation/native'

export default function RecoverPassword(){
    const navigation =useNavigation()
    return(
        <View style={{flex:1, justifyContent:'center',alignItems:'center'}}>
            <Text >Recuperar Senha</Text>
            <Text onPress={()=>navigation.navigate('Login')}>Login</Text>
        </View>
    )
}