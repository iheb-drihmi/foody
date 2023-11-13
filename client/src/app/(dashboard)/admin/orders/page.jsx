'use client';

import ComponentLevelLoader from '@/components/Loader/componentlevel';
import { GlobalContext } from '@/context';
import api from '@/lib/axios';
import { useContext, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { useRouter } from 'next/navigation';

export default function AdminView() {
  const {
    allOrdersForAllUsers,
    setAllOrdersForAllUsers,
    user,
    pageLevelLoader,
    setPageLevelLoader,
    componentLevelLoader,
    setComponentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllOrdersForAllUsers() {
    try {
      setPageLevelLoader(true);
      const { data } = await api.get(`/orders/`);
      setAllOrdersForAllUsers(data.result.filter(item => item.user_id !== user.id));
    } catch (error) {
      console.log(error);
    } finally {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllOrdersForAllUsers();
  }, [user]);

  async function handleUpdateOrderStatus(getItem) {
    try {
      let id = getItem._id.$oid;
      setComponentLevelLoader({ loading: true, id });
      const update = api.patch(`/orders/${id}`, {
        isProcessing: false,
      });
      extractAllOrdersForAllUsers();
      router.refresh();
      router.prefetch();
      router;
    } catch (err) {
    } finally {
      setComponentLevelLoader({ loading: false, id: '' });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color={'#000000'} loading={pageLevelLoader} size={10} data-testid="loader" />
      </div>
    );
  }

  if (!allOrdersForAllUsers.length) {
    return <div>No Orders</div>;
  }

  return (
    <section>
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div>
          <div className="px-4 py-6 sm:px-8 sm:py-10">
            <div className="flow-root">
              {allOrdersForAllUsers && allOrdersForAllUsers.length ? (
                <ul className="flex flex-col gap-4">
                  {allOrdersForAllUsers.map(item => (
                    <li
                      key={item._id}
                      className="bg-gray-200 shadow p-5 flex flex-col space-y-3 py-6 text-left"
                    >
                      <div className="flex">
                        <div className="flex flex-col flex-1">
                          <h1 className="font-bold text-lg ">#order: {item._id.$oid}</h1>
                          <p className="text-sm mb-3 ml-2">
                            Created at:{' '}
                            {new Intl.DateTimeFormat('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            }).format(new Date(item.createdAt))}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Name :</p>
                            <p className="text-sm  font-semibold text-gray-900">
                              {item?.user?.name}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">User Email :</p>
                            <p className="text-sm  font-semibold text-gray-900">
                              {item?.user?.email}
                            </p>
                          </div>
                          <div className="flex items-center">
                            <p className="mr-3 text-sm font-medium text-gray-900">
                              Total Paid Amount :
                            </p>
                            <p className="text-sm  font-semibold text-gray-900">
                              {new Intl.NumberFormat().format(item.totalPrice + 7)} DT
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {item.orderItems.map((orderItem, index) => (
                          <div key={index} className="shrink-0">
                            <img
                              alt="Order Item"
                              className="h-24 w-24 max-w-full rounded-lg object-cover"
                              src={orderItem && orderItem.product && orderItem.product.imageUrl}
                            />
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-5">
                        <button className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide">
                          {item.isProcessing ? 'Order is Processing' : 'Order is delivered'}
                        </button>
                        <button
                          onClick={() => handleUpdateOrderStatus(item)}
                          disabled={!item.isProcessing}
                          className="disabled:opacity-50 mt-5 mr-5  inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
                        >
                          {componentLevelLoader &&
                          componentLevelLoader.loading &&
                          componentLevelLoader.id === item._id ? (
                            <ComponentLevelLoader
                              text={'Updating Order Status'}
                              color={'#ffffff'}
                              loading={componentLevelLoader && componentLevelLoader.loading}
                            />
                          ) : (
                            'Update Order Status'
                          )}
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
