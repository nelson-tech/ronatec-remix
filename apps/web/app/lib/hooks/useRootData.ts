import { RootLoaderData } from '~/root';
import useMatchesData from './useMatchesData';

const useRootData = () => {
  return useMatchesData('root') as RootLoaderData;
};

export default useRootData;
