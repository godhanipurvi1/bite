import {
createContext,
useContext,
useState
} from "react";


const WishlistContext=createContext();



export function WishlistProvider({children}){


const [wishlist,setWishlist]=useState([]);



const toggleWishlist=(food)=>{


setWishlist(prev=>{


const exists=
prev.find(
item=>item.id===food.id
);



if(exists){

return prev.filter(
item=>item.id!==food.id
)

}


return [
...prev,
food
]


})


}



return(

<WishlistContext.Provider
value={{
wishlist,
toggleWishlist
}}
>

{children}

</WishlistContext.Provider>

)


}



export const useWishlist=
()=>useContext(WishlistContext);