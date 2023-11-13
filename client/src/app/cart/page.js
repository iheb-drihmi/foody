'use client';

import CommonCart from '@/components/CommonCart';
import { GlobalContext } from '@/context';
import api from '@/lib/axios';
import { deleteFromCart, getAllCartItems } from '@/services/cart';
import { useContext, useEffect } from 'react';
import { PulseLoader } from 'react-spinners';
import { toast } from 'react-toastify';

export default function Cart() {
  const {
    user,
    setCartItems,
    cartItems,
    pageLevelLoader,
    setPageLevelLoader,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  async function extractAllCartItems() {
    try {
      setPageLevelLoader(true);
      const { result } = await getAllCartItems(user?.id);
      if (result) {
        const updatedData =
          result && result.length
            ? result.map(item => ({
                ...item,
                price: parseInt((item.price - item.price * (item.priceDrop / 100)).toFixed(2)),
              }))
            : [];
        setCartItems(updatedData);
        localStorage.setItem('cartItems', JSON.stringify(updatedData));
      }
    } finally {
      setPageLevelLoader(false);
    }
  }

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(getCartItemID) {
    const id = getCartItemID.$oid;
    try {
      setComponentLevelLoader({ loading: true, id });
      const { data } = await api.delete(`/cart/${id}`);
      toast.success(data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      extractAllCartItems();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setComponentLevelLoader({ loading: false, id: id });
    }
  }

  if (pageLevelLoader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader color={'#000000'} loading={pageLevelLoader} size={30} data-testid="loader" />
      </div>
    );
  }

  return (
    <CommonCart
      componentLevelLoader={componentLevelLoader}
      handleDeleteCartItem={handleDeleteCartItem}
      cartItems={cartItems}
    />
  );
}
