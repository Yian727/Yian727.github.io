import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useContentStore as useContentStoreHook } from '../hooks/useContentStore';

const ContentStoreContext = createContext<ReturnType<typeof useContentStoreHook> | null>(null);

export function ContentStoreProvider({ children }: { children: ReactNode }) {
  const store = useContentStoreHook();
  return (
    <ContentStoreContext.Provider value={store}>
      {children}
    </ContentStoreContext.Provider>
  );
}

export function useContentStore() {
  const context = useContext(ContentStoreContext);
  if (!context) {
    throw new Error('useContentStore must be used within ContentStoreProvider');
  }
  return context;
}
