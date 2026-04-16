import { useState } from "react";

export default function LikeButton() {

    /* Using  useState hook*/
    let [ likes, setLikes ] = useState(0);

    // let likes = 0;

    function countLikes(e){
        // likes++;
        
        setLikes(likes + 1);
    
        console.log(likes);
        console.log(e);
    }

    return <button onClick={countLikes} >{likes} Likes</button>
}