import { Link } from "react-router-dom"
import { Button } from "./ui/button.tsx"

const MobileNavLinks = () => {
  return (
    <>
        <Link to="/user-profile" className="flex text-black items-center font-bold hover:text-blue-500 ">
        UserProfile
        </Link>
        <Button className="flex bg-blue-600 text-white items-center px-3 font-bold hover:bg-gray-500">
            Log Out
        </Button>
    </>
  )
}

export default MobileNavLinks
