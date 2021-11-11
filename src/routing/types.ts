import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/core';
import { MainRoutes, MainStackParamList } from './routes';

export type MainNavigationProp<
  RouteName extends keyof MainStackParamList = MainRoutes,
> = StackNavigationProp<MainStackParamList, RouteName>;

export type MainRouteProp<
  RouteName extends keyof MainStackParamList = MainRoutes,
> = RouteProp<MainStackParamList, RouteName>;
