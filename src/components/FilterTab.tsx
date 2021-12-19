import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors, Typography } from '../styles';

type FilterTabProps = {
  tabName: string;
  tabDisplayName?: string;
};

export const FilterTab = ({
  tabName,
  tabDisplayName,
}: FilterTabProps): React.ReactElement => {
  return (
    <View style={styles.filterTab}>
      <View style={styles.innerContainer}>
        <Text style={styles.filterTabText}>{tabDisplayName || tabName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterTab: {
    backgroundColor: Colors.offWhite,
    alignSelf: 'flex-start',
    padding: 6,
    borderRadius: 8,
    marginRight: 8,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 2,
  },
  filterTabText: {
    ...Typography.bodyFont,
    fontSize: 12,
    paddingRight: 2,
  },
});
