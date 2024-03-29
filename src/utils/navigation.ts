import {
  type NavigationProp,
  createNavigationContainerRef,
  useNavigation as useNavigationNative,
} from '@react-navigation/native';

// Types
import {RootStackParamList} from '@utils/types/navigation';

export {useRoute} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();
export const useNavigation = () => {
  return useNavigationNative<NavigationProp<RootStackParamList>>();
};
