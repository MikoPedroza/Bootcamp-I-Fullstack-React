import Cookies from "js-cookie";
import { Query } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

const fetchTasks = async ( { queryKey } ) => {
    const [_key, { order = "asc", page = 1, limit = 5 } ] = queryKey;

    const token = Cookies.get("token");
    // console.log(token);

    // Create URL with parameters
    const url = new URL(`${import.meta.env.VITE_API_URL}tasks`);
    url.searchParams.append("order", order);
    url.searchParams.append("limit", limit);
    url.searchParams.append("page", page);

    const response = await fetch( url, {
        method: "GET",
        headers: {
            "Content-Type" : "application/json",
            Authorization : `Bearer ${token}`,

        },
        // body: JSON.stringify(task),  

    } );

    if( !response.ok ){
        throw new Error("Network response was not okay.");
    }
    
    return await response.json();
};

export function useFetchTasks( params = {} ) {
    return useQuery( {
        queryKey: [ "fetchTasks", params ],
        // queryKey: [ "fetchTasks", JSON.stringify(params) ], // chatgpt fix
        queryFn: fetchTasks,
        onSuccess: (response) => {
            console.log("Tasks fetched successfully.", response);
        },
        onError: (error) => {
            console.log("There was an error in fetching task.", error);
        },
    } );
}

