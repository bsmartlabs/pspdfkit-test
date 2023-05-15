import * as React from 'react';

const resources = require('./resources/resources.json');

import { Platform, StyleSheet, View } from 'react-native';
import {
  BookReaderView,
  // PDFStateChangedEvent,
  // PdfViewRef,
} from 'react-native-book-reader';

// import type { Book } from '@bsmartlabs/sdk';
import { useRef } from 'react';

// const DOCUMENT = Platform.OS === 'ios' ? 'Document.pdf' : 'file:///android_asset/Document.pdf';
const DOCUMENT = Platform.OS === 'ios' ? 'Book19341.pdf' : 'file:///android_asset/Book19341.pdf';

const PASSWORD =
  'NmIwNDA3MDhkOTU1M2U2MDlmYTMwNzcwNDdhZDU4MWQ5ZXMxOTM0MTVlNTIzNjIzMTc0MjVlYmU4YjQ2MDM2MGFhZGJlMmVmbVh6QXdNVjlpZWpFej0=';

const BOOK = {
  id: 100000,
  authors: [],
  brand: {
    id: 100001,
    name: 'bSmart brand',
    publisher: {
      id: 100002,
      name: 'bSmart labs',
    },
  },
  school_subjects: [],
  current_edition: {
    revision: 1,
  },
  activations: [],
  title: 'Libro di prova',
  subtitle: 'sottotitolo',
  book_code: 'xxxx',
  cambridge_dictionary: false,
  page_count: 12,
  resource_id: 1,
  rtl: false,
  liquid_text: false,
};

const user = {
  id: 4,
  name: 'bSmart',
  email: 'bsmart@bsmart.it',
  surname: 'bsmart',
  avatar_url: 'https://i.pravatar.cc/300',
};

export default function App() {
  const pdfRef = useRef(null);
  const addingIcons = useRef(false);

  // const onStateChanged = (event) => {
  //   if (event.nativeEvent.documentLoaded && addingIcons.current === false) {
  //     addingIcons.current = true;
  //     pdfRef.current
  //       // ?.addResourceIcons(resources)
  //       .catch((err) => {
  //         console.log('Error adding resource icons', err);
  //         return undefined;
  //       })
  //       .then(() => {});
  //   }
  // };
  return (
    <View style={styles.container}>
      <BookReaderView
        documentWithPassword={{
          uri: DOCUMENT,
          password: PASSWORD,
        }}
        book={BOOK}
        user={user}
        // onStateChanged={onStateChanged}
        fragmentTag="PDF1"
        style={styles.pdf}
        ref={pdfRef}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pdf: {
    flex: 1,
  },
});
