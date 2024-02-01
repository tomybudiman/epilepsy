import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

// Redux
import store from 'store/index';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>{null}</Provider>
    </SafeAreaProvider>
  );
};

export default App;
