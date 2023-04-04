import store, { TStoreType } from '@/stores/store';
import { useSelector } from 'react-redux';

export function useStore() {
  const state = store.getState() as TStoreType;
  const stores = useSelector<typeof state, typeof state>((state) => state);
  return { state, stores };
}
