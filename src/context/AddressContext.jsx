import React, { createContext, useContext, useState } from "react";

const AddressContext = createContext(null);

/* Seed data — same two addresses your Checkoutaddress page used before */
const DEFAULT_ADDRESSES = [
  {
    id: 1,
    type: "Home",
    name: "Priya Sharma",
    phone: "98765 43210",
    line: "402, Sunrise Apartments, Linking Road",
    landmark: "",
    city: "Mumbai",
    pincode: "400050",
    area: "Bandra West, Mumbai 400050",
  },
  {
    id: 2,
    type: "Work",
    name: "Priya Sharma",
    phone: "98765 43210",
    line: "14th Floor, Orion Business Park",
    landmark: "",
    city: "Mumbai",
    pincode: "400069",
    area: "Andheri East, Mumbai 400069",
  },
];

export function AddressProvider({ children }) {
  const [addresses, setAddresses] = useState(DEFAULT_ADDRESSES);
  const [selectedId, setSelectedId] = useState(DEFAULT_ADDRESSES[0].id);

  const addAddress = (address) => {
    const newAddress = {
      id: Date.now(),
      ...address,
      area: [address.city, address.pincode].filter(Boolean).join(" "),
    };
    setAddresses((prev) => [...prev, newAddress]);
    setSelectedId(newAddress.id);
    return newAddress;
  };

  const selectAddress = (id) => setSelectedId(id);

  const selectedAddress =
    addresses.find((a) => a.id === selectedId) || addresses[0] || null;

  return (
    <AddressContext.Provider
      value={{
        addresses,
        addAddress,
        selectAddress,
        selectedId,
        selectedAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
}

export function useAddress() {
  const ctx = useContext(AddressContext);
  if (!ctx) {
    throw new Error("useAddress must be used within an AddressProvider");
  }
  return ctx;
}