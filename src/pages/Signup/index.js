
import React, {useState} from "react";
import { Platform } from "react-native";
import {Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText} from './styled'


export default function SignUp(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [nome, setNome] = useState('');

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
            

            <SubmitButton>
                <SubmitText>Cadastrar</SubmitText>
            </SubmitButton>

        


        </Container>
      </Background>
    )
}