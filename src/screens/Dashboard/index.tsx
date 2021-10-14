import React, { useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useEffect } from 'react';
import { useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import AsyncStorage from "@react-native-async-storage/async-storage"

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
  LoadContainer
} from './styles'

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  outgoings: HighLightProps;
  total: HighLightProps;
}

function getLastTransactionDate(
  collection: DataListProps[],
  type: 'up' | 'down'
) {

  const lastTransaction =
    new Date(
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())));

  return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', { month: 'long' })}`
}

export function Dashboard() {
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);
  const [isLoading, setIsLoading] = useState(true);

  const theme = useTheme();

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let outgoingsTotal = 0;

    const transactionsFormatted: DataListProps[] = transactions
      .map((transaction: DataListProps) => {

        if (transaction.type === 'up') {
          entriesTotal += Number(transaction.amount);
        } else {
          outgoingsTotal += Number(transaction.amount);
        }

        const amount = Number(transaction.amount)
          .toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).replace('R$', 'R$ ');

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit'
        }).format(new Date(transaction.date));

        return {
          id: transaction.id,
          name: transaction.name,
          amount,
          type: transaction.type,
          category: transaction.category,
          date,
        }
      });

    setTransactions(transactionsFormatted);

    const lastTransactionEntries = getLastTransactionDate(transactions, 'up');
    const lastTransactionOutgoings = getLastTransactionDate(transactions, 'down');
    const totalInterval = `01 a ${lastTransactionOutgoings}`;

    const total = entriesTotal - outgoingsTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`
      },
      outgoings: {
        amount: outgoingsTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionOutgoings}`
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval
      }
    })
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(useCallback(() => {
    loadTransactions();
  }, []));

  return (
    <Container>
      {
        isLoading ? (
          <LoadContainer>
            <ActivityIndicator
              color={theme.colors.primary}
              size="large"
            />
          </LoadContainer>
        )
          :
          (
            <>
              <Header>
                <UserWrapper>
                  <UserInfo>
                    <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/49957773?v=4' }} />
                    <User>
                      <UserGretting>Olá,</UserGretting>
                      <UserName>Matheus</UserName>
                    </User>
                  </UserInfo>
                  <LogoutButton
                    onPress={() => { }}
                  >
                    <Icon name="power" />
                  </LogoutButton>
                </UserWrapper>
              </Header>

              <HighlightCards>
                <HighlightCard
                  type="up"
                  title="Entrada"
                  amount={highLightData.entries.amount}
                  lastTransaction={highLightData.entries.lastTransaction}
                />

                <HighlightCard
                  type="down"
                  title="Saídas"
                  amount={highLightData.outgoings.amount}
                  lastTransaction={highLightData.outgoings.lastTransaction}
                />

                <HighlightCard
                  type="total"
                  title="Total"
                  amount={highLightData.total.amount}
                  lastTransaction={highLightData.total.lastTransaction}
                />
              </HighlightCards>

              <Transactions>
                <Title>Listagens</Title>

                <TransactionsList
                  data={transactions}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => <TransactionCard data={item} />}
                />
              </Transactions>
            </>
          )

      }

    </Container>
  )
}