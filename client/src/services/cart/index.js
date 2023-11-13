import Cookies from 'js-cookie';
import api from '@/lib/axios';

export const addToCart = async formData => {
  const {
    _id: { $oid: product_id },
    user_id,
    ...rest
  } = formData;
  const { data } = await api.post('/cart/', {
    ...rest,
    product_id,
    user_id,
  });

  return data;
};

export const getAllCartItems = async id => {
  try {
    const { data } = await api(`/cart/${id}`);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromCart = async id => {
  try {
    const { data } = await api.delete(`/cart/${id}`);

    return data;
  } catch (e) {
    console.log(e.response.data);
  }
};
