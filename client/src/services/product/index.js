//add a new product service
import api from '@/lib/axios';

import Cookies from 'js-cookie';

export const addNewProduct = async formData => {
  try {
    const data = await api.post('/products', formData);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllAdminProducts = async params => {
  try {
    const { data } = await api('/products', { params });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateAProduct = async formData => {
  try {
    const res = await fetch('/api/admin/update-product', {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
      cache: 'no-store',
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteAProduct = async id => {
  try {
    const { data } = await api.delete(
      `/products/${id}`
      // Authorization: `Bearer ${Cookies.get('token')}`,
    );

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productByCategory = async id => {
  try {
    const res = await fetch(`http://localhost:3000/api/admin/product-by-category?id=${id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    const data = await res.json();

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const productById = async id => {
  try {
    const { data } = await api(`/products/${id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};
