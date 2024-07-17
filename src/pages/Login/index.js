import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert,ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import api from '../../config/api'
import * as yup from 'yup'


export default function Login() {

    // Navegar entre as telas
    const navigation = useNavigation();

    // Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // Processar/submeter os dados do formulário
    const loginSubmit = async() => {
        //{console.log(password,email)}
       // Alert.alert('', 'E-mail:'+ email);
        //Alert.alert('', 'Senha: '+ password);
    try{
        //validar com YUP
        await  validaticionSchema.validate(
            {email, password},{ abortEarly:false}
        )   
        await api.post('/login',{email,password})
        .then((response)=>{
            Alert.alert("SUCESSO!",response.data.message)
            console.log(response.data.message)
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
        }

    }

    const  validaticionSchema = yup.object().shape({
        email: yup.string("Erro! Colocar o Email").required("Erro! F Necessário Preencher o campo Email"),
        password: yup.string("Erro! Colocar a Senha").required("Erro! F Necessário Preencher a Senha")
    })

    return (
        <ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
            <View style={styles.logo}>
                <Image source={require('../../../assets/images/tag.png')} />
            </View>

            <TextInput
                style={styles.inputForm}
                placeholder='Usuário'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
            />

            <TextInput
                style={styles.inputForm}
                placeholder='Senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />

            <TouchableOpacity style={styles.btnSubmitForm} onPress={loginSubmit}  >
            
                <Text style={styles.txtSubmitForm}>
                    Acessar
                </Text>
            </TouchableOpacity>
            
            <Text style={styles.linkNewUser} onPress={() => navigation.navigate('NewUser')}>
                Cadastrar
            </Text>

            <Text style={styles.linkNewUser} onPress={() => navigation.navigate('RecoverPassword')}>
                Recuperar Senha
            </Text>

        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#203C3F',
    },
    logo: {
        paddingBottom: 20
    },
    inputForm: {
        backgroundColor: '#f5f5f5',
        width: '90%',
        marginBottom: 15,
        color: '#10101c',
        fontSize: 18,
        borderRadius: 20,
        padding: 10,
    },
    btnSubmitForm: {
        backgroundColor: '#1f51fe',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
    },
    txtSubmitForm: {
        color: '#f5f5f5',
        fontSize: 22,
    },
    linkNewUser: {
        color: '#1f51fe',
        marginTop: 10,
        fontSize: 18
    }
});