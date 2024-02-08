export type RootStackParamList = {
  SplashScreen: undefined;
  AuthEmail: undefined;
  AuthPassword: {email: string; type: 'signIn' | 'signUp'};
};
