
import React, {useContext, useState} from "react";
import { ActivityIndicator, Platform } from "react-native";
import {Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText} from './styled'
import { AuthContext } from "../../context/auth";


export default function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');

    const {signUp, loadingAuth} = useContext(AuthContext)

    function hadleSignUp(){
        signUp(email,password,nome);
    }
    return (
      <Background>
        <Container
        behavior={Platform.OS === 'ios' ? 'padding' : ''}>
            <Logo source={require('../../assets/Logo.png')}/>

            <AreaInput>
                <Input 
                placeholder='nome'
                autoCorrect={false}
                autoCapitalize="none"
                value={nome}
                onChangeText={(text)=> setNome(text)}/>
            
            </AreaInput>

            <AreaInput>
                <Input 
                placeholder='email'
                autoCorrect={false}
                autoCapitalize="none"
                value={email}
                onChangeText={(text)=> setEmail(text)}
                />
            
            </AreaInput>

            <AreaInput>
                <Input 
                placeholder='senha'
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={(text)=> setPassword(text)}
                secureTextEntry={true}/>
            
            </AreaInput>
            

            <SubmitButton onPress={hadleSignUp}>
            {
                        loadingAuth ? (
                            <ActivityIndicator size={20} color='#FFF'/>
                        ) :(
                <SubmitText>Cadastrar</SubmitText>)}
            </SubmitButton>

        


        </Container>
      </Background>
    )
}