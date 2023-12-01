import { Picker } from '@react-native-picker/picker';
import { useOrder } from '../../contexts/RepositoryListOrderContext';
import { StyleSheet } from 'react-native';
import theme from '../../utils/theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.furthestBackground
  }
});


const RepositoryListOrderPicker = () => {
  const { order, changeOrder } = useOrder();

  const handleOrderChange = (value) => {
    changeOrder(value);
  };

  return (
    <Picker
      selectedValue={order}
      onValueChange={handleOrderChange}
      style={styles.container}
    >
      <Picker.Item label="Latest repositories" value="CREATED_AT" />
      <Picker.Item label="Highest rated repositories" value="RATING_AVERAGE_DESC" />
      <Picker.Item label="Lowest rated repositories" value="RATING_AVERAGE_ASC" />
    </Picker>
  )
}

export default RepositoryListOrderPicker;