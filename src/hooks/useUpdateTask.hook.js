// import { useMutation } from "@tanstack/react-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const updateTask = async ( task ) => {
    const token = Cookies.get("token");

    const response = await fetch( `${import.meta.env.VITE_API_URL}tasks`, {
        method: "PATCH",
        headers: {
            "Content-type" : "application/json",
            Authorization : `Bearer ${token}`,

        },
        body: JSON.stringify(task),

    } );

    if( !response.ok ){
        throw new Error("Network response was not okay.");
    }
    
    return await response.json();
};

export function useUpdateTask() {
    // const queryClient = useQueryClient();

    return useMutation( {
        mutationFn: updateTask,
        onSuccess: (response) => {
            console.log("Updated task successfully.", response);
            // Cookies.set("token", response.data.accessToken, { expires: 1 });


            // queryClient.invalidateQueries({
            //     queryKey: ["fetchTasks"],
            //     exact: false,
            //     refetchType: "all", // refetch both active and inactive queries
            // }); 
        },
        onError: (error) => {
            console.log("There was an error in updating task.", error);
        },
    } );
}

