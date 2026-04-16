import LikeButton from "../likeButton/likeButton";
import styles from "./userProfile.module.css";


import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


export default function UserProfile(props) {

    /* Assigning default values */
    const { firstName = "First name not added", lastName = "Last name not added", skills = "Skills not added" } = props;

    return (
        <div className="flex flex-col w-full pt-8 items-center">
            <Avatar className="mb-4">
                {/* <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" /> */}
                <AvatarFallback className="text-2xl font-semibold">
                    { firstName.slice(0, 1) }
                </AvatarFallback>
            </Avatar>
            <h4>Hello, { firstName } </h4>
        </div>
    );
}