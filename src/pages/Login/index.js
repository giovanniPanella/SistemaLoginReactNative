// Incluir os componentes utilizado para estruturar o conteúdo
import { Image,ActivityIndicator, Alert, ScrollView } from 'react-native';

// Importar o arquivo com os componentes CSS
import { Container, Logo, ImageLogo, InputForm, BtnSubmitForm, TxtSubmitForm, LinkNewUser, LoadingArea } from '../../styles/custom';

// Incluir a função navegar entre as telas
import { useNavigation } from '@react-navigation/native';

// Incluir AsyncStorage para armazenar dados
import AsyncStorage from '@react-native-async-storage/async-storage';

// useState - Adicionar estado ao componente
import { useState } from 'react';

// Arquivo com as configurações da API
import api from '../../config/api';

// Validar os dados do formulário
import * as yup from 'yup';

// Criar e exportar a função com a tela login 
export default function Login() {

    // Navegar entre as telas
    const navigation = useNavigation();

    // Armazenar as informações do usuário
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // Processar/submeter os dados do formulário
    const loginSubmit = async () => {

        // Usar try e catch para gerenciar exceção/erro
        try { // Permanece no try se não houver nenhum erro

            // Alterar para TRUE e apresentar loading
            setLoading(true);

            // Validar o formulário com Yup
            await validationSchema.validate({ email, password }, { abortEarly: false });

            // Requisição para a API indicando a rota e os dados
            await api.post('/login', { email, password })
                .then((response) => { // Acessar o then quando a API retornar status sucesso

                    //console.log(response.data);
                    // Salvar os dados no AsyncStorage
                    AsyncStorage.setItem('@token', response.data.user.token);
                    AsyncStorage.setItem('@name', response.data.user.name);
                    AsyncStorage.setItem('@email', response.data.user.email);

                    // Redirecionar para página inicial
                    navigation.navigate('Home');

                    // Alert.alert("Sucesso", response.data.message);

                }).catch((err) => { // Acessar o catch quando a API retornar status erro

                    //console.log(err.response.data.message.toString());            
                    if (err.response) { // Acessa o IF quando a API retornar erro
                        Alert.alert("Ops", err.response.data.message.toString());
                    } else { // Acessa o ELSE quando a API não responder
                        Alert.alert("Ops", "Erro: Tente novamente!");
                    }

                });
        } catch (error) { // Acessa o catch quando houver erro no try

            if (error.errors) { // Acessa o IF quando existir a mensagem de erro
                Alert.alert("Ops", error.errors[0]);
            } else { // Acessa o ELSE quando não existir a mensagem de erro
                Alert.alert("Ops", "Erro: Tente novamente!");
            }

        } finally {

            // Alterar para false e ocultar loading
            setLoading(false);
        }
    }

    // Validar o formulário com Yup
    const validationSchema = yup.object().shape({
        email: yup.string("Erro: Necessário preencher o campo usuário!")
            .required("Erro: Necessário preencher o campo usuário!"),
        password: yup.string("Erro: Necessário preencher o campo senha!")
            .required("Erro: Necessário preencher o campo senha!"),
    });

    
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
