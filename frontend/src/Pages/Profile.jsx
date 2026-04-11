import { useAuth } from "../context/useAuth"

const Profile = () => {
    const { currentUser } = useAuth();

  return (
    <div className="flex  justify-center bg-blue-50 min-h-screen md:pt-20">
      Hello! {currentUser.firstName}
    </div>
  )
}

export default Profile
