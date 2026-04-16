import UserProfile from "./components/userProfile/userProfile.jsx";


const user = {
  firstName: "John",
  lastName: "Doe",
  skills: "NodeJs, React"
};
const user2 = {
  firstName: "Mark",
  lastName: "Doe",
  skills: "HTML, React"
};



function App() {

  return (
    <>
      {/* <UserProfile /> */}
      <UserProfile firstName={user.firstName} lastName={user.lastName} skills={user.skills} />
      <UserProfile firstName={user2.firstName} lastName={user2.lastName} skills={user2.skills} />
      <h1>Hello World</h1>
    </>
  )
}

export default App
