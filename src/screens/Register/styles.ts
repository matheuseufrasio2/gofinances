import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { FlatList } from 'react-native'
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper'
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) => theme.colors.primary};

  width: 100%;
  height: ${RFValue(113)}px;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 19px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.colors.shape};;
  font-family: ${({ theme }) => theme.fonts.regular};;

  font-size: ${RFValue(18)}px;
`;
export const Form = styled.View`
  flex: 1;

  width: 100%;
  padding: 24px;

  justify-content: space-between;
`;
export const Fields = styled.View``;
export const TransactionsTypes = styled.View`
  flex-direction: row;
  justify-content: space-between;

  margin-top: 8px;
  margin-bottom: 16px;
`;