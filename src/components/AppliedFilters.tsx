import { useAnswersState } from '@yext/answers-headless-react';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FilterTab } from './FilterTab';

export const AppliedFilters = (): React.ReactElement => {
  const appliedFilters = useAnswersState(state =>
    state.vertical.results?.verticalResults.appliedQueryFilters.filter(
      qFilter =>
        !state.filters.facets
          ?.map(facet => facet.fieldId)
          .includes(qFilter.filter.fieldId),
    ),
  );

  return (
    <View style={styles.container}>
      {appliedFilters?.map((filter, i) => (
        <FilterTab key={i} tabName={filter.displayValue} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginHorizontal: 18,
    flexDirection: 'row',
  },
});
