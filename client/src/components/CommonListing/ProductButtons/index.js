'use client';

import ComponentLevelLoader from '@/components/Loader/componentlevel';
import { GlobalContext } from '@/context';
import api from '@/lib/axios';
import { addToCart } from '@/services/cart';
import { deleteAProduct } from '@/services/product';
import { usePathname, useRouter } from 'next/navigation';
import { useContext } from 'react';
import { toast } from 'react-toastify';

export default function ProductButton({ item }) {
  const pathName = usePathname();
  const {
    setCurrentUpdatedProduct,
    setComponentLevelLoader,
    componentLevelLoader,
    user,
    showCartModal,
    setShowCartModal,
  } = useContext(GlobalContext);
  const router = useRouter();

  const isAdminView = pathName.includes('admin');

  async function handleDeleteProduct(item) {
    const id = item._id.$oid;
    try {
      setComponentLevelLoader({ loading: true, id: id });
      const {
        data: { message },
      } = await api.delete(`/products/${id}`);

      console.log(message);

      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      router.refresh();
      router.prefetch();
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setComponentLevelLoader({ loading: false, id: '' });
    }
  }

  async function handleAddToCart(getItem) {
    let id = getItem._id.$oid;
    if (!user?.id) {
      toast.error('Please login.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      setTimeout(() => router.push('/login'), 1000);
    }

    try {
      setComponentLevelLoader({ loading: true, id: id });
      const { message } = await addToCart({ ...getItem, user_id: user.id });
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
      });
      setShowCartModal(true);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_RIGHT,
      });
    } finally {
      setComponentLevelLoader({ loading: false, id: id });
    }
  }

  return isAdminView ? (
    <>
      <button
        onClick={() => {
          setCurrentUpdatedProduct(item);
          router.push('/admin/products/create');
        }}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteProduct(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        item._id === componentLevelLoader.id ? (
          <ComponentLevelLoader
            text={'Deleting Product'}
            color={'#ffffff'}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          'DELETE'
        )}
      </button>
    </>
  ) : (
    <>
      <button
        onClick={() => handleAddToCart(item)}
        className="mt-1.5 flex w-full justify-center bg-black px-5 py-3 text-xs font-medium uppercase tracking-wide text-white"
      >
        {componentLevelLoader &&
        componentLevelLoader.loading &&
        componentLevelLoader.id === item._id ? (
          <ComponentLevelLoader
            text={'Adding to cart'}
            color={'#ffffff'}
            loading={componentLevelLoader && componentLevelLoader.loading}
          />
        ) : (
          'Add To Cart'
        )}
      </button>
    </>
  );
}
