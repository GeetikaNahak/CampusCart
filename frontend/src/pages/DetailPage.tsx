import { useGetStore } from "@/api/StoreApi";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import StoreInfo from "@/components/StoreInfo";
import { Card, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Item as MenuItemType } from "../types";
import CheckoutButton from "@/components/CheckoutButton";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { useCreateCheckoutSession } from "@/api/OrderApi";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

const DetailPage = () => {
  const { storeId } = useParams();
  const { store, isLoading } = useGetStore(storeId);
  const {createCheckoutSession,isLoading:isCheckoutLoading}=useCreateCheckoutSession();
  const [cartItems, setCartItems] = useState<CartItem[]>(()=>{
    const storedCarItems=sessionStorage.getItem(`cartItems-${storeId}`);
    return storedCarItems?JSON.parse(storedCarItems):[];
  });
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === menuItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }
      sessionStorage.setItem(`cartItems-${storeId}`,JSON.stringify(updatedCartItems))
      return updatedCartItems;
    });
  };
  const onCheckout=async(userFormData:UserFormData)=>{
    if(!store){
      return;
    }
    console.log("UserFormData",userFormData);
    const checkoutData={
      cartItems:cartItems.map((cartItem)=>({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      storeId: store?._id,

    }
    const data=await createCheckoutSession(checkoutData);
    window.location.href=data.url;
  }


  const removeFromCart = (cartItem: CartItem) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = prevCartItems.filter(
        (item) => cartItem._id !== item._id
      );
      return updatedCartItems;
    });
  };
  if (isLoading || !store) {
    return "...Loading";
  }
  return (
    <div className="flex flex-col gap-10">
      <AspectRatio ratio={16 / 5}>
        <img
          src={store.imageUrl}
          className=" rounded-md object-contain h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <StoreInfo store={store} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>

          {store.items.map((menuItem) => (
            <MenuItem
              addToCart={() => addToCart(menuItem)}
              menuItem={menuItem}
            />
          ))}
        </div>

        <div>
          <Card>
            <OrderSummary
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            <CardFooter><CheckoutButton disabled={cartItems.length===0} isLoading={isCheckoutLoading} onCheckout={onCheckout}/></CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
