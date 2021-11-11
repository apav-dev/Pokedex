import { createNativeStackNavigator } from '@react-navigation/native-stack';

export enum MainRoutes {
  Search = 'Search',
  PokeSummary = 'PokeSummary',
}

export type MainStackParamList = {
  [MainRoutes.Search]: undefined;
  [MainRoutes.PokeSummary]: { pokeId: string };
};

export const MainStack = createNativeStackNavigator<MainStackParamList>();
