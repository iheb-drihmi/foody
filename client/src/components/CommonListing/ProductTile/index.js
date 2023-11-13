'use client';

import { useRouter } from 'next/navigation';

export default function ProductTile({ item }) {
  const router = useRouter();

  const display_price = price =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: 'TND',
      maximumFractionDigits: 2,
    }).format(price);

  return (
    <div onClick={() => router.push(`/products/${item._id.$oid}`)}>
      <div className="overflow-hideen aspect-w-1 aspect-h-1 h-52 rounded-md">
        <img
          src={item?.imageUrl || 'https://www.ardovaplc.com/_nuxt/img/no-product.69b9efa.png'}
          alt="Product image"
          className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
        />
      </div>
      {item.onSale === 'yes' ? (
        <div className="absolute top-0 m-2 rounded-full bg-black">
          <p className="rounded-full  p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
            Sale
          </p>
        </div>
      ) : null}
      <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
        <div className="mb-2 flex">
          <p
            className={`mr-3 text-sm font-semibold ${
              item.onSale === 'yes' ? 'line-through text-red-700' : ''
            }`}
          >{`${display_price(item.price)}`}</p>
          {item.onSale === 'yes' ? (
            <p className="mr-3 text-sm font-semibold">{`${display_price(
              item.price - item.price * (item.priceDrop / 100)
            )}`}</p>
          ) : null}
          {item.onSale === 'yes' ? (
            <p className="mr-3 text-xs font-semibold">{`-(${item.priceDrop}%) off`}</p>
          ) : null}
        </div>
        <h3 className="md-2 text-gray-400 text-sm">{item.name}</h3>
        <h3 className="mt-2 text-gray-400 text-sm">
          {item.description.length > 60 ? `${item.description.slice(0, 60)}...` : item.description}
        </h3>
      </div>
    </div>
  );
}
