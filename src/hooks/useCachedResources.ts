import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        // Load fonts
        await Font.loadAsync({
          ...FontAwesome.font,
          ...Ionicons.font,
          'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
          'Averta-Black': require('../assets/fonts/Averta-Black.otf'),
          'Averta-BlackItalic': require('../assets/fonts/Averta-BlackItalic.otf'),
          'Averta-Bold': require('../assets/fonts/Averta-Bold.otf'),
          'Averta-BoldItalic': require('../assets/fonts/Averta-BoldItalic.otf'),
          'Averta-ExtraBold': require('../assets/fonts/Averta-ExtraBold.otf'),
          'Averta-Extrathin': require('../assets/fonts/Averta-Extrathin.otf'),
          'Averta-ExtraBoldItalic': require('../assets/fonts/Averta-ExtraBoldItalic.otf'),
          'Averta-Light': require('../assets/fonts/Averta-Light.otf'),
          'Averta-LightItalic': require('../assets/fonts/Averta-LightItalic.otf'),
          'Averta-Regular': require('../assets/fonts/Averta-Regular.otf'),
          'Averta-RegularItalic': require('../assets/fonts/Averta-RegularItalic.otf'),
          'Averta-Semibold': require('../assets/fonts/Averta-Semibold.otf'),
          'Averta-SemiboldItalic': require('../assets/fonts/Averta-SemiboldItalic.otf'),
          'Averta-Thin': require('../assets/fonts/Averta-Thin.otf'),
          'Averta-ThinItalic': require('../assets/fonts/Averta-ThinItalic.otf'),
          'icomoon': require('../assets/fonts/icomoon.ttf'),
          'pulser': require('../assets/fonts/icomoon.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
}
