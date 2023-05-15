
import type {
    PDFDataReturnedEvent,
    PDFViewProps,
  } from './types/pspdfkit';
  import {
    NativeMethods,
    requireNativeComponent,
    UIManager,
    Platform,
    // ViewStyle,
  } from 'react-native';
  
  
  type NativePdfViewProps = PDFViewProps & {
    onDataReturned: (event: PDFDataReturnedEvent) => void;
  };
  type RCTPSPDFKitViewRef = React.Component<NativePdfViewProps> & Readonly<NativeMethods>;
  

  const LINKING_ERROR =
  `The package 'react-native-book-reader' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';  

const ComponentName = 'BookReaderView';

// export const BookReaderView =
//   UIManager.getViewManagerConfig(ComponentName) != null
//     ? requireNativeComponent(ComponentName)
//     : () => {
//         throw new Error(LINKING_ERROR);
//       };

export const BookReaderView =
UIManager.getViewManagerConfig(ComponentName) != null
    ? requireNativeComponent<
        NativePdfViewProps & {
          ref?: React.Ref<RCTPSPDFKitViewRef> | undefined;
        }
      >(ComponentName)
    : () => {
        throw new Error(LINKING_ERROR);
      };