import React from 'react';
import { View, Text } from 'react-native';

import { Container, Titulo, Nome, BotaoSujeito, BotaoText } from './src/styles';

export default function App() {
 return (
   <Container>
     <Titulo cor="#FF0000" >Sujeito Programador</Titulo>
     <Nome>Olá Matheus!</Nome>

     <BotaoSujeito onPress={ () => alert('CLICOU!') }>
       <BotaoText>Entrar</BotaoText>
     </BotaoSujeito>

   </Container>
  );
}
