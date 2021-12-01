import React, { useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';
import { PokeCard } from './PokeCard';
import { useAnswersState } from '@yext/answers-headless-react';
import { getCardFromResult } from '../utils/getCardFromResult';

const win = Dimensions.get('window');

const CARD_WIDTH = win.width * 0.75;
const SPACING_FOR_CARD_INSET: number = win.width * 0.1 - 10;

// const cards = [
//   {
//     imgSrc:
//       'https://a.mktgcdn.com/p-sandbox/o56f4T1d5biot8Ndw8wIEU9ZMLw3kl7uEFh6-xdHPCU/240x330.png',
//     artist: 'Ken Sugimori',
//     rarity: 'Rare Holo',
//     cardSetName: 'Gym Challenge',
//     number: 2,
//     printedTotal: 132,
//     releaseDate: '10/16/2000',
//     versionPrices: [
//       {
//         version: 'Holofoil',
//         pricing: {
//           low: 221.09,
//           mid: 249.97,
//           high: 667.65,
//           market: 336.12,
//           directLow: 0,
//         },
//       },
//       {
//         version: '1st Edition Holofoil',
//         pricing: {
//           low: 999.99,
//           mid: 1100,
//           high: 1425,
//           market: 336.12,
//           directLow: 0,
//         },
//       },
//     ],
//   },
//   {
//     imgSrc:
//       'https://a.mktgcdn.com/p-sandbox/MmoSgZ7KbFlvXuZRHi30vEvHSQBYnmsgkXj2KU8BgRg/240x330.png',
//     artist: 'Mitsuhiro Arita',
//     rarity: 'Rare Holo',
//     cardSetName: 'Base',
//     number: 4,
//     printedTotal: 102,
//     releaseDate: '01/09/1999',
//     versionPrices: [
//       {
//         version: 'Holofoil',
//         pricing: {
//           low: 199.95,
//           mid: 335,
//           high: 700,
//           market: 367.95,
//           directLow: 0,
//         },
//       },
//     ],
//   },
//   {
//     imgSrc:
//       'https://a.mktgcdn.com/p-sandbox/tAiKX66EwfXubJ38il5FcJDOVwbCXLe6s4H9-hBeYwA/245x342.png',
//     artist: 'Daisuke Ito',
//     rarity: 'Rare Holo',
//     cardSetName: 'Secret Wonders',
//     number: 3,
//     printedTotal: 132,
//     releaseDate: '11/01/2007',
//     versionPrices: [
//       {
//         version: 'Holofoil',
//         pricing: {
//           low: 43.99,
//           mid: 53.31,
//           high: 199.99,
//           market: 146.33,
//           directLow: 33.32,
//         },
//       },
//       {
//         version: 'Reverse Holofoil',
//         pricing: {
//           low: 48.94,
//           mid: 59.98,
//           high: 102,
//           market: 102.54,
//           directLow: 35.99,
//         },
//       },
//     ],
//   },
// ];

export const CardCarousel = () => {
  const _scrollView = useRef<unknown>(null);

  const searchLoading = useAnswersState(state => state.vertical.searchLoading);
  const verticalKey = useAnswersState(state => state.vertical.key);
  const cards = useAnswersState(state =>
    state.vertical.results?.verticalResults.results.map(result =>
      getCardFromResult(result),
    ),
  );

  return (
    <View>
      {verticalKey === 'pokemon_card' && !searchLoading ? (
        <Animated.ScrollView
          ref={_scrollView}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          decelerationRate="fast"
          snapToInterval={CARD_WIDTH + 45}
          snapToAlignment="center"
          contentInset={{
            //for iOS
            top: 0,
            left: SPACING_FOR_CARD_INSET,
            bottom: 0,
            right: SPACING_FOR_CARD_INSET,
          }}
          contentOffset={{
            x: -SPACING_FOR_CARD_INSET,
            y: 0,
          }}>
          {cards.map((card, i) => (
            <PokeCard key={i} card={card} />
          ))}
        </Animated.ScrollView>
      ) : (
        <PokeCard loading />
      )}
    </View>
  );
};
