import { useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";

const createTask = async ( task ) => {
    const token = Cookies.get("token");
    console.log(token);

    const response = await fetch( `${import.meta.env.VITE_API_URL}tasks`, {
        method: "POST",
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

export function useCreateTask() {
    // const queryClient = useQueryClient();

    return useMutation( {
        mutationFn: createTask,
        onSuccess: (response) => {
            console.log("Created task successfully.", response);
            // Cookies.set("token", response.data.accessToken, { expires: 1 });

            // chatGPT fix
            // queryClient.invalidateQueries({
            //     queryKey: ["fetchTasks"],
            //     exact: false,
            //     refetchType: "all", // refetch both active and inactive queries
            // });
        },
        onError: (error) => {
            console.log("There was an error in creating task.", error);
        },
    } );
}

