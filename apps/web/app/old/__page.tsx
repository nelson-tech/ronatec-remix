import { NavLink, Outlet, useMatches } from '@remix-run/react';
import { Button } from '@org/ui';
import { Logo } from '~/components/Logo';
import type { RootLoaderData } from '~/root';

export default function Index() {
  const matches = useMatches();

  const [{ data }] = matches;
  const { products, user } = (data as RootLoaderData) || {};

  return !products ? (
    <div></div>
  ) : (
    <div className="page">
      <nav>
        <ul className="container">
          <li>
            <Logo />
          </li>
          <div className="nav-pages">
            {products?.map((product) => (
              <li key={product.slug}>
                <NavLink to={product.slug ?? '/'}>{product.title}</NavLink>
              </li>
            ))}
          </div>
          <li>
            {user ? (
              <form action="/logout" method="POST">
                <Button
                  as="input"
                  value="Log out"
                  size="small"
                  color="dark"
                  type="submit"
                />
              </form>
            ) : (
              <Button as={NavLink} to="/login" size="small" color="dark">
                Log in
              </Button>
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
