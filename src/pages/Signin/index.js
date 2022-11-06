
import React, {useState} from "react";
import { View, Text } from "react-native";
import {Background, Container, Logo, AreaInput, Input, SubmitButton, SubmitText, Link, LinkText} from './styled'


export default function SignIn(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
      <Background>
        <Container>
            <Logo source={require('../../assets/Logo.png')}/>

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
                <SubmitText>Entrar</SubmitText>
            </SubmitButton>

            <Link>
            <LinkText>Criar uma conta!</LinkText>
            </Link>


        </Container>
      </Background>
    )
}