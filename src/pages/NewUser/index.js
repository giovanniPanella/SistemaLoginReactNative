import { Text, View, Image, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {useState} from 'react';
import api from '../../config/api'
import * as yup from 'yup'
import { ScrollView } from 'react-native-gesture-handler';


export default function NewUser(){
    const navigation =useNavigation()

    // Armazenar as informações do usuário
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    // Processar/submeter os dados do formulário
    const addUser = async() => {
        try{
            //validar com YUP
            await  validaticionSchema.validate(
                {name, email, password},{abortEarly:false}
            )   
            await api.post('/new-users',{name,email,password})
            .then((response)=>{
                Alert.alert("SUCESSO!",response.data.message)
                console.log(response.data.message)
            {/*Redirecionar para Tela de Login */}
             navigation.navigate('Login')

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
        name: yup.string("Erro! Colocar o Email")
        .required("Erro! F Necessário Preencher o campo Nome"),
        email: yup.string("Erro! Colocar o Email")
        .required("Erro! F Necessário Preencher o campo Email")
        .email("Erro! F Necessário preencher e-mail válido!"),
        password: yup.string("Erro! Colocar a Senha")
        .required("Erro! F Necessário Preencher a Senha")
        .min(6, "Erro! F A senha deve ter no mínimo 6 caracteres!")
    })

    return(

<ScrollView contentContainerStyle={{flexGrow:1}}>
        <View style={styles.container}>
             <View style={styles.logo}>
                <Image source={require('../../../assets/images/tag.png')} />
            </View>
            {/*criar campo nome*/}
            <TextInput
                style={styles.inputForm}
                placeholder='Nome Completo'
                value={name}
                onChangeText={text => setName(text)}
            />
             {/*criar campo email*/}
            <TextInput
                style={styles.inputForm}
                placeholder='Usuário'
                autoCorrect={false}
                keyboardType='email-address'
                autoCapitalize='none'
                value={email}
                onChangeText={text => setEmail(text)}
            />
       {/*criar campo senha*/}
            <TextInput
                style={styles.inputForm}
                placeholder='Senha'
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />

        <TouchableOpacity style={styles.btnSubmitForm} onPress={addUser}  >
            
            <Text style={styles.txtSubmitForm}>
                Cadastrar
            </Text>
        </TouchableOpacity>

        <Text style={styles.linkNewUser} onPress={() => navigation.navigate('Login')}>
            Login   
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