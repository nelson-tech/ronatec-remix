import { useMatches } from '@remix-run/react';
import { useMemo } from 'react';

const useMatchesData = (id: string) => {
  const matchingRoutes = useMatches();

  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  );

  return route?.data;
};

export default useMatchesData;
