import type { Page, Product } from '@org/cms';

export const findProductBySlug = (slug: string, products: Product[]) => {
  return products?.find((product) => product.slug === slug);
};
