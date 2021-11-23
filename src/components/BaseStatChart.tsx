import React from 'react';
import { StyleSheet } from 'react-native';
import {
  VictoryArea,
  VictoryChart,
  VictoryLabel,
  VictoryPolarAxis,
  VictoryTheme,
} from 'victory-native';

export type BaseStats = {
  hp: number;
  attack: number;
  defense: number;
  spAttack: number;
  spDefense: number;
  speed: number;
};

type BaseStatChartProps = {
  stats: BaseStats;
};

export const BaseStatChart = ({
  stats,
}: BaseStatChartProps): React.ReactElement => (
  <VictoryChart polar theme={VictoryTheme.material} height={300} width={300}>
    <VictoryArea
      style={{
        data: {
          fill: 'white',
          stroke: 'black',
          color: '#A9A9A9',
          strokeWidth: 1,
        },
      }}
      data={[255, 255, 255, 255, 255, 255]}
    />
    <VictoryArea
      style={{
        data: {
          fill: '#87CEFA',
          opacity: 0.7,
        },
      }}
      data={[
        stats.hp,
        stats.attack,
        stats.defense,
        stats.spAttack,
        stats.spDefense,
        stats.speed,
      ]}
    />
    <VictoryPolarAxis
      style={{
        axis: {
          stroke: 'transparent',
        },
        grid: {
          stroke: '#A9A9A9',
          strokeDasharray: '1',
        },
      }}
      tickValues={[
        `HP-${stats.hp}`,
        `Attack-${stats.attack}`,
        `Sp. Att-${stats.spAttack}`,
        `Defense-${stats.defense}`,
        `Speed-${stats.speed}`,
        `Sp. Def-${stats.spDefense}`,
      ]}
      tickLabelComponent={
        <VictoryLabel
          style={styles.font}
          labelPlacement={'perpendicular'}
          text={({ datum }) => datum.split('-')}
        />
      }
      labelPlacement="vertical"
    />
  </VictoryChart>
);

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Exo2-Regular',
  },
});
