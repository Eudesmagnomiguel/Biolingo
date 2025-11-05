'use client';

import { useCollection as useReactFirebaseHooksCollection } from 'react-firebase-hooks/firestore';
import type { Query } from 'firebase/firestore';

export function useCollection(query: Query | null) {
  return useReactFirebaseHooksCollection(query);
}
