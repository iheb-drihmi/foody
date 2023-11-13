'use client';
import Link from 'next/link';
import ProductButton from '../CommonListing/ProductButtons';
import { useCallback, useEffect, useState } from 'react';
import { getAllAdminProducts } from '@/services/product';
import { fav_categories } from '@/utils';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const display_price = price =>
  new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'TND',
    maximumFractionDigits: 2,
  }).format(price);

export default function Products({ filter, limit: _limit = 10, title }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const param = (key, default_value) => {
    let value = searchParams.get(key) || default_value;
    if (isNaN(value)) return value;
    else return Number(value);
  };

  const limit = param('limit', _limit);
  const [category, setCategory] = useState(param('category', 'all'));
  const [page, setPage] = useState(param('page', 1));
  const [products, setProducts] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [isLoading, setLoading] = useState(false);
  const [isLatest, setIsLatest] = useState(false);

  const makeQ = useCallback(
    params_obj => {
      let params = new URLSearchParams(searchParams);

      for (const key in params_obj) {
        params.set(key, params_obj[key]);
      }

      return pathname + '?' + params.toString();
    },
    [searchParams]
  );

  const f = async old => {
    setLoading(true);
    const params = { limit, category, page };

    try {
      const { result, latest } = await getAllAdminProducts(params);
      setIsLatest(latest);
      if (!firstLoad) {
        router.push(`${makeQ(params)}`, {
          scroll: false,
        });
      }

      if (old) {
        setProducts(prevProducts => [...prevProducts, ...result]);
      } else {
        setProducts(result);
      }

      setLoading(false);
      setFirstLoad(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    f(true);
  }, [page]);

  useEffect(() => {
    f();
  }, [category]);

  return (
    <div className="grid justify-center gap-y-6 mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="text-2xl font-bold text-center text-gray-900">{title || 'Our Menu'}</h2>
      {filter && (
        <ul className="flex justify-center gap-4">
          {fav_categories.map(({ label, value }) => (
            <button
              onClick={() => setCategory(value)}
              className={`flex ${
                category === value && 'bg-black text-white'
              } w-36 justify-center p-3 text-xs font-medium tracking-wide border border-gray-200 rounded-full`}
            >
              {value === category && isLoading ? 'Loading...' : label}
            </button>
          ))}
        </ul>
      )}

      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.length > 0
          ? products.map(product => (
              <div key={product._id} className="group">
                <div className="relative aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <Link href={`/products/${product._id.$oid}`}>
                    <img
                      src={
                        product?.imageUrl ||
                        'https://www.ardovaplc.com/_nuxt/img/no-product.69b9efa.png'
                      }
                      alt="Product image"
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                  </Link>
                  {product.onSale === 'yes' ? (
                    <div className="absolute top-0 m-2 rounded-full bg-black">
                      <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
                        Sale
                      </p>
                    </div>
                  ) : null}
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href={product.href}>
                        <span aria-hidden="true" className="" />
                        {product.name}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                      {product.description?.length > 60
                        ? `${product.description.slice(0, 60)}...`
                        : product.description}
                    </p>
                  </div>
                </div>
                <div className="mt-2 mb-4 flex">
                  {product.priceDrop ? (
                    <p
                      className={`mr-3 text-sm font-semibold ${
                        product.onSale === 'yes' ? 'line-through text-red-700' : ''
                      }`}
                    >
                      {`${display_price(product.price)}`}
                    </p>
                  ) : null}
                  {product.onSale === 'yes' || !product.priceDrop ? (
                    <p className="mr-3 text-sm font-semibold ">{`${display_price(
                      product.price - product.price * (product.priceDrop / 100)
                    )}`}</p>
                  ) : null}
                  {product.onSale === 'yes' && product.priceDrop ? (
                    <p className="mr-3 text-sm font-semibold">{`-${product.priceDrop}%`}</p>
                  ) : null}
                </div>
                <ProductButton item={product} />
              </div>
            ))
          : 'No Products Found.'}
      </div>

      <div className="w-full grid justify-center mt-8">
        {pathname === '/products' || pathname === '/admin/products' ? (
          <button
            disabled={isLatest}
            onClick={() => setPage(page + 1)}
            className="disabled:bg-slate-100 disabled:text-slate-500 mt-1.5 flex w-36 justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            Show more
          </button>
        ) : (
          <Link
            href="/products"
            className="mt-1.5 flex w-36 justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
          >
            Show more
          </Link>
        )}
      </div>
    </div>
  );
}
