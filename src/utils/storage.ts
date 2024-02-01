import {useMMKVStorage, MMKVLoader} from 'react-native-mmkv-storage';

export {useMMKVStorage};
export default new MMKVLoader().withEncryption().initialize();

// HOW TO USE IT
// https://rnmmkv.vercel.app/#/callbackapi?id=synchronous-api
