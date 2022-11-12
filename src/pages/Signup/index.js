
import React, {useContext, useState} from "react";
import { Platform } from "react-native";
import {Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText} from './styled'
import { AuthContext } from "../../context/auth";


export default function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');

    const {signUp} = useContext(AuthContext)

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
                onChangeText={(text)=> setEmail(text)}/>
            
            </AreaInput>

            <AreaInput>
                <Input 
                placeholder='senha'
                autoCorrect={false}
                autoCapitalize="none"
                value={password}
                onChangeText={(text)=> setPassword(text)}/>
            
            </AreaInput>
            

            <SubmitButton onPress={hadleSignUp}>
                <SubmitText>Cadastrar</SubmitText>
            </SubmitButton>

        


        </Container>
      </Background>
    )
}