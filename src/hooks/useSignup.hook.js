import { useMutation } from "@tanstack/react-query";


const createUser = async ( user ) => {
    // const response = await fetch( "http://localhost:3001/users/create" );
    const response = await fetch( `${import.meta.env.VITE_API_URL}users/create`, {
        method: "POST",
        headers: {
            "Content-type" : "application/json",

        },
        body: JSON.stringify(user),

    } );

    if( !response.ok ){
        throw new Error("Network response was not okay.");
    }
    
    return await response.json();
};

export function useSignup() {
    return useMutation( {
        mutationFn: createUser,
        onSuccess: (response) => {
            console.log("The user was created successfully.", response);
        },
        onError: (error) => {
            console.log("There was an error creating the user.", error);
        },
    } );
}

