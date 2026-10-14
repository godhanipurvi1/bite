import {createContext,useContext,useState} from "react";


const CartContext=createContext();



export function CartProvider({children}){


const [cart,setCart]=useState([]);



const addToCart=(food)=>{


setCart(prev=>{

const exists=prev.find(
item=>item.id===food.id
);


if(exists){

return prev.map(item=>
item.id===food.id
?
{
...item,
quantity:item.quantity+1
}
:
item
)

}


return [
...prev,
{
...food,
quantity:1
}
]


});


};




const removeCart=(id)=>{

setCart(
cart.filter(item=>item.id!==id)
)

}



const totalItems =
cart.reduce(
(sum,item)=>sum+item.quantity,
0
);



return(

<CartContext.Provider
value={{
cart,
addToCart,
removeCart,
totalItems
}}
>

{children}

</CartContext.Provider>

)


}



export const useCart=()=>useContext(CartContext);