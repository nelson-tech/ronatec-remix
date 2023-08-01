import type { MetaFunction } from '@remix-run/node';
import { useMatches, useParams } from '@remix-run/react';
import { RenderBlocks } from '~/components/Blocks';
import type { RootLoaderData } from '~/root';
import { findProductBySlug } from '~/utils';

// export const meta: MetaFunction = ({ parentsData, params }) => {
//     const { page: pageSlug } = params;
//     const {
//         root: { products },
//     } = parentsData;

//     const page = findPageBySlug(pageSlug ?? 'home', pages);
//     return {
//         title: page?.meta.title,
//         description: page?.meta.description,
//         keywords: page?.meta.keywords,
//     };
// };

export default function Page() {
  const { page: slug } = useParams();

  const [{ data }] = useMatches();
  const { products } = data as RootLoaderData;
  const product = findProductBySlug(slug ?? 'home', products);

  return (
    <main className="page-content container">
      {product?.title}
      {product?.layout ? (
        <RenderBlocks layout={product.layout} />
      ) : (
        'This page seem to be empty'
      )}
    </main>
  );
}
