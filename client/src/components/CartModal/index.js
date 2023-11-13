"use client";

import { Fragment, useContext, useEffect } from "react";
import CommonModal from "../CommonModal";
import { GlobalContext } from "@/context";
import { deleteFromCart, getAllCartItems } from "@/services/cart";
import { toast } from "react-toastify";
import ComponentLevelLoader from "../Loader/componentlevel";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";

export default function CartModal() {
  const {
    showCartModal,
    setShowCartModal,
    cartItems,
    setCartItems,
    user,
    setComponentLevelLoader,
    componentLevelLoader,
  } = useContext(GlobalContext);

  const router = useRouter();

  async function extractAllCartItems() {
    try {
      const res = await getAllCartItems(user?.id);
      const updatedData =
        res.result && res.result.length
          ? res.result.map((item) => ({
              ...item,
              price:
                item.onSale === "yes"
                  ? parseInt(
                      (
                        item.price -
                        item.price * (item.priceDrop / 100)
                      ).toFixed(2)
                    )
                  : item.price,
            }))
          : [];
      console.log(updatedData);
      setCartItems(updatedData);
      localStorage.setItem("cartItems", JSON.stringify(updatedData));
    } catch (err) {}
  }

  const updateQuantity = async (product_id, qty) => {
    try {
      const { data } = await api.post("/cart/update_quantity", {
        user_id: user.id,
        product_id: product_id,
        qty: qty,
      });
    } catch (err) {
    } finally {
    }
  };

  useEffect(() => {
    if (user !== null) extractAllCartItems();
  }, [user]);

  async function handleDeleteCartItem(item_id) {
    let id = item_id;

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

  return (
    <CommonModal
      showButtons={true}
      show={showCartModal}
      setShow={setShowCartModal}
      mainContent={
        cartItems && cartItems.length ? (
          <ul role="list" className="z-100 my-6 divide-y divide-gray-300">
            {cartItems.map((cartItem) => (
              <li key={cartItem._id.$oid} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={cartItem && cartItem.imageUrl}
                    alt="Cart Item"
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                      <h3>
                        <a>{cartItem && cartItem.name}</a>
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">
                      {cartItem && cartItem.price} DT
                    </p>
                    {/* <p className="mt-1 text-sm text-gray-600">{cartItem && cartItem.qty}</p> */}
                    <div className="flex gap-2">
                      {/* <button
                        onClick={() => {
                          if (cartItem.qty < 2) handleDeleteCartItem(cartItem._id.$oid);
                          else updateQuantity(cartItem._id.$oid, -1);
                        }}
                      >
                        -
                      </button> */}
                      <p>{cartItem.qty}</p>
                      {/* <button onClick={() => updateQuantity(cartItem._id.$oid, 1)}>+</button> */}
                    </div>
                  </div>
                  <div className="flex flex-1 items-end justify-between text-sm">
                    <button
                      type="button"
                      className="font-medium text-yellow-600 sm:order-2"
                      onClick={() => handleDeleteCartItem(cartItem._id.$oid)}
                    >
                      {componentLevelLoader &&
                      componentLevelLoader.loading &&
                      componentLevelLoader.id === cartItem._id ? (
                        <ComponentLevelLoader
                          text={"Removing"}
                          color={"#000000"}
                          loading={
                            componentLevelLoader && componentLevelLoader.loading
                          }
                        />
                      ) : (
                        "Remove"
                      )}
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          "No items"
        )
      }
      buttonComponent={
        <Fragment>
          <button
            type="button"
            onClick={() => {
              router.push("/cart");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide"
          >
            Go To Cart
          </button>
          <button
            disabled={cartItems && cartItems.length === 0}
            type="button"
            onClick={() => {
              router.push("/checkout");
              setShowCartModal(false);
            }}
            className="mt-1.5 w-full inline-block bg-black text-white px-5 py-3 text-xs font-medium uppercase tracking-wide disabled:opacity-50"
          >
            Checkout
          </button>
          <div className="mt-6 flex justify-center text-center text-sm text-gray-600">
            <button type="button" className="font-medium text-grey">
              Continue Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </div>
        </Fragment>
      }
    />
  );
}
