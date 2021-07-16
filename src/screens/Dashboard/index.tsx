import React from 'react';

import { HighlightCard } from '../../components/HighlightCard'
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard'

import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGretting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

export function Dashboard() {
  const data: DataListProps[] = [
    {
      id: '1',
      type: 'positive',
      title: "Salário",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2020"
    },
    {
      id: '2',
      type: 'negative',
      title: "Alimentação",
      amount: "R$ 1.000,00",
      category: {
        name: 'Vendas',
        icon: 'coffee'
      },
      date: "13/04/2020"
    },
    {
      id: '3',
      type: 'negative',
      title: "Aluguel",
      amount: "R$ 1.200,00",
      category: {
        name: 'Vendas',
        icon: 'shopping-bag'
      },
      date: "13/04/2020"
    },
    {
      id: '4',
      type: 'positive',
      title: "Desenvolvimento de site",
      amount: "R$ 12.000,00",
      category: {
        name: 'Vendas',
        icon: 'dollar-sign'
      },
      date: "13/04/2020"
    }
  ]

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo source={{uri: 'https://avatars.githubusercontent.com/u/49957773?v=4'}} />
            <User>
              <UserGretting>Olá,</UserGretting>
              <UserName>Matheus</UserName>
            </User>
          </UserInfo>
          <LogoutButton
            onPress={() => {}}
          >
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
      
      <HighlightCards>
        <HighlightCard
          type="up"
          title="Entrada"
          amount="R$17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />

        <HighlightCard 
          type="down"
          title="Saídas"
          amount="R$1.244,56"
          lastTransaction="Última entrada dia 03 de abril"
        />

        <HighlightCard
          type="total"
          title="Total"
          amount="R$16.120,00"
          lastTransaction="01 à 13 de abril"
        />
      </HighlightCards>
    
      <Transactions>
        <Title>Listagens</Title>

        <TransactionsList
          data={data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => <TransactionCard data={item} />}
        />
      </Transactions>
    </Container>
  )
}