import { Image,  Alert,ScrollView, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import api from '../../config/api'
import * as yup from 'yup'
import {Container,Logo,InputForm,BtnSubmitForm,TxtSubmitForm,LinkNewUser,LoadingArea} from '../../styles/custom'
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Login() {

    // Navegar entre as telas
    const navigation = useNavigation();

    // Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // Processar/submeter os dados do formulário
    const loginSubmit = async() => {
        //{console.log(password,email)}
       // Alert.alert('', 'E-mail:'+ email);
        //Alert.alert('', 'Senha: '+ password);
    try{

        setLoading(true)
        //validar com YUP
        await  validaticionSchema.validate(
            {email, password},{ abortEarly:false}
        )   
        await api.post('/login',{email,password})
        .then((response)=>{
            //salvando os dados
            AsyncStorage.setItem('@token',response.data.user.token)
            AsyncStorage.setItem('@name',response.data.user.name)
            AsyncStorage.setItem('@email',response.data.user.email)
            //redirecionar para Home
            navigation.navigate('Home')

            //Alert.alert("SUCESSO!",response.data.message)
            //console.log(response.data.message)
        })
        .catch((erro)=>{

            if(erro.response){
                Alert.alert("OPS",erro.response.data.message.toString())
                console.log(erro.response.data.message)
            }else{
                Alert.alert("OPS","Tente Novamente!")
                console.log("Tente Novamente!")
            }
        })
        }catch(erro){
            if(erro.errors){
                Alert.alert("OPS",erro.errors[0])
                console.log(erro.errors.toString())
                }else{
                    Alert.alert("OPS","Tente Novamente")
                    console.log("Tente Novamente")
                }
        } finally{
            setLoading(false)
        }

    }

    const  validaticionSchema = yup.object().shape({
        email: yup.string("Erro! Colocar o Email").required("Erro! F Necessário Preencher o campo Email"),
        password: yup.string("Erro! Colocar a Senha").required("Erro! F Necessário Preencher a Senha")
    })

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <Container>
            <Logo>
                <Image source={require('../../../assets/images/tag.png')} />
            </Logo>

            <InputForm
                
                placeholder='Usuário'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                editable = {!loading}
                onChangeText={text => setEmail(text)}
            />

            <InputForm
                placeholder='Senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                editable = {!loading}
                onChangeText={text => setPassword(text)}
            />

            <BtnSubmitForm disabled={loading} onPress={loginSubmit}  >
            
                <TxtSubmitForm>
                    Acessar
                </TxtSubmitForm>
            </BtnSubmitForm>
            
            <LinkNewUser onPress={() => navigation.navigate('NewUser')}>
                Cadastrar
            </LinkNewUser>

            <LinkNewUser onPress={() => navigation.navigate('RecoverPassword')}>
                Recuperar Senha
            </LinkNewUser>
             {loading && 
        <LoadingArea>
             <ActivityIndicator size="large" color='#f5f5f5'/>
        </LoadingArea>
        }  
        </Container>
        </ScrollView>
    )
}
