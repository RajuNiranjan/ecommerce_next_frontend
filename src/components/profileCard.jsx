import { Card } from "@/components/ui/card";
import { UserCircle } from "lucide-react";
import { useSelector } from "react-redux";

const ProfileCard = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <Card className="w-full h-full border border-gray-300 hover:shadow-lg transition-all duration-300 p-4">
      <div className="flex justify-center items-center flex-col text-center">
        <div>
          <UserCircle size={34} />
        </div>
        <div>
          <h1 className="text-xl font-bold">{user?.userName}</h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>
      </div>
    </Card>
  );
};

export default ProfileCard;
