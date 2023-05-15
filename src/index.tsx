import type { PSPDFKitModule } from './types';
import {
  NativeModules,
} from 'react-native';
export * from './types';

export * from './BookReaderView';
const PSPDFKit = NativeModules.PSPDFKit as PSPDFKitModule;
export { PSPDFKit };





