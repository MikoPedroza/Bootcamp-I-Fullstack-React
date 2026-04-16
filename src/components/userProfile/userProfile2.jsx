/* Already depracated when using vite with shadcnui */


// import React from "react"; // no longer needed in later versions of react with vite

// import "./UserProfile.css";
import LikeButton from "../likeButton/likeButton";
import styles from "./userProfile.module.css";

// export default function UserProfile() {
// export default function UserProfile({ firstName , lastName, skills } = props) {
export default function UserProfile(props) {

    /* Assigning default values */
    const { firstName = "First name not added", lastName = "Last name not added", skills = "Skills not added" } = props;

    return (
        <>
            <section>
                {/* <ul class="user-details">
                    <li>First Name: John</li>
                    <li>Last Name: Doe</li>
                    <li>Skills: React, JavaScript</li>
                </ul> */}
                {/* <ul className={ `${styles.userDetails} ${styles.border}`}>
                    <li>First Name: John</li>
                    <li>Last Name: Doe</li>
                    <li>Skills: React, JavaScript</li>
                </ul> */}
                <ul className={ `${styles.userDetails} ${styles.border}`}>
                    <li>First Name: {firstName}</li>
                    <li>Last Name: {lastName}</li>
                    <li>Skills: {skills}</li>
                    
                </ul>
                <LikeButton />
            </section>
        </>
    );
}