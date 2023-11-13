export const navOptions = [
  {
    id: "listing",
    label: "Menu",
    path: "/products",
  },
  // {
  //   id: 'fruits',
  //   label: 'Fruits',
  //   path: '/products?category=fruits',
  // },
  // {
  //   id: 'vegetables',
  //   label: 'Vegetables',
  //   path: '/products?category=fruits',
  // },
];

export const adminNavOptions = [
  {
    id: "orders",
    label: "View all orders",
    path: "/admin/orders",
  },
  {
    id: "adminListing",
    label: "Manage All Products",
    path: "/admin/products",
  },
  {
    id: "adminNewProduct",
    label: "Add New Product",
    path: "/admin/products/create",
  },
];

export const registrationFormControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter your name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
    title: "Please enter a valid email address",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
    required: true,
    pattern: "^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?!.*(.)(.)\\1)\\S{8,}$",
    title:
      "Password must have at least 8 characters, including one uppercase letter, one lowercase letter, one digit, and no consecutive repeated characters.",
  },
];

export const loginFormControls = [
  {
    id: "email",
    type: "email",
    placeholder: "Enter your email",
    label: "Email",
    componentType: "input",
  },
  {
    id: "password",
    type: "password",
    placeholder: "Enter your password",
    label: "Password",
    componentType: "input",
  },
];

export const categories = [
  {
    id: "proteins",
    label: "Proteins",
  },
  {
    id: "grains",
    label: "Grains and Cereals",
  },
  {
    id: "fruits",
    label: "Fruits",
  },
  {
    id: "vegetables",
    label: "Vegetables",
  },
  {
    id: "dairy",
    label: "Dairy and Dairy Alternatives",
  },
  {
    id: "desserts",
    label: "Sweets and Desserts",
  },
  {
    id: "snacks",
    label: "Snacks",
  },
  {
    id: "beverages",
    label: "Beverages",
  },
  {
    id: "condiments",
    label: "Condiments and Sauces",
  },
];

export const fav_categories = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "grains",
    label: "Grains & Cereals",
  },
  {
    value: "fruits",
    label: "Fruits",
  },
  {
    value: "vegetables",
    label: "Vegetables",
  },
  {
    value: "dairy",
    label: "Dairy",
  },
];

export const adminAddProductformControls = [
  {
    id: "name",
    type: "text",
    placeholder: "Enter name",
    label: "Name",
    componentType: "input",
  },
  {
    id: "price",
    type: "number",
    placeholder: "Enter price",
    label: "Price",
    min: 0,
    step: 10,
    componentType: "input",
  },
  {
    id: "description",
    type: "text",
    placeholder: "Enter description",
    label: "Description",
    componentType: "input",
  },
  {
    id: "category",
    type: "",
    placeholder: "",
    label: "Category",
    componentType: "select",
    options: categories,
  },
  {
    id: "deliveryInfo",
    type: "text",
    placeholder: "Enter deliveryInfo",
    label: "Delivery Info",
    componentType: "input",
  },
  {
    id: "onSale",
    type: "",
    placeholder: "",
    label: "On Sale",
    componentType: "select",
    options: [
      {
        id: "yes",
        label: "Yes",
      },
      {
        id: "no",
        label: "No",
      },
    ],
  },
  {
    id: "priceDrop",
    type: "number",
    placeholder: "Enter Price Drop",
    label: "Discount",
    max: 100,
    min: 0,
    componentType: "input",
  },
];

export const AvailableSizes = [
  {
    id: "s",
    label: "S",
  },
  {
    id: "m",
    label: "M",
  },
  {
    id: "l",
    label: "L",
  },
];

export const firebaseConfig = {
  apiKey: "AIzaSyBS5eHF-o5JySfuJaYWo7Xsr7KCteWDn-Y",
  authDomain: "todoapp-4e7e3.firebaseapp.com",
  projectId: "todoapp-4e7e3",
  storageBucket: "todoapp-4e7e3.appspot.com",
  messagingSenderId: "524528280944",
  appId: "1:524528280944:web:41e5559c0306fc76c01bb5",
};

export const firebaseStroageURL = "gs://todoapp-4e7e3.appspot.com";

export const addNewAddressFormControls = [
  {
    id: "fullName",
    type: "input",
    placeholder: "Enter your full name",
    label: "Full Name",
    componentType: "input",
  },
  {
    id: "address",
    type: "input",
    placeholder: "Enter your full address",
    label: "Address",
    componentType: "input",
  },
  {
    id: "city",
    type: "input",
    placeholder: "Enter your city",
    label: "City",
    componentType: "input",
  },
  {
    id: "country",
    type: "input",
    placeholder: "Enter your country",
    label: "Country",
    componentType: "input",
  },
  {
    id: "postalCode",
    type: "input",
    placeholder: "Enter your postal code",
    label: "Postal Code",
    componentType: "input",
  },
];
