'use client';

import { useRef, useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { makeStore, AppStore } from './store';
import { Persistor } from 'redux-persist';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  const persistorRef = useRef<Persistor | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  if (!storeRef.current) {
    const { store, persistor } = makeStore();
    storeRef.current = store;
    persistorRef.current = persistor;
  }

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Provider store={storeRef.current}>
      {isMounted && persistorRef.current ? (
        <PersistGate loading={null} persistor={persistorRef.current}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}
