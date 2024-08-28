import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit, Loader2, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";
import { ENV_VAR } from "@/config/envVar";
import {
  authFailure,
  authStart,
  authSuccess,
} from "@/store/actions/auth.slice";
import { useToast } from "@/components/ui/use-toast";

const Profile = () => {
  const { loading, user } = useSelector((state) => state.auth);
  const router = useRouter();
  const apiUri = ENV_VAR.API_URI;
  const userID = user?._id;
  const dispatch = useDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

  const [updateUserInfo, setUpdateUserInfo] = useState({
    userName: user?.userName,
    password: "",
  });

  const handleChangeText = (e) => {
    const { id, value } = e.target;
    setUpdateUserInfo((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmitUpdateUserInfo = async (e) => {
    e.preventDefault();
    if (!updateUserInfo.userName)
      return toast({ title: "Please fill the fields", duration: 1000 });
    dispatch(authStart());
    try {
      const res = await axios.patch(
        `${apiUri}/api/user/${userID}`,
        updateUserInfo
      );
      const data = res.data;
      dispatch(authSuccess(data.user));
      toast({
        title: data.message,
        duration: 1000,
      });
    } catch (error) {
      console.log(error);
      dispatch(authFailure(error.response.data));
      toast({
        title: error.response.data,
        duration: 1000,
      });
    }
  };

  console.log("user from profile", user);

  return (
    <div>
      <div className="w-full flex items-center justify-between">
        <div className="flex  items-center gap-2">
          <UserCircle />
          <div>
            <h1 className="text-xl font-bold">{user?.userName}</h1>
            <p className="text-gray-500">{user?.email}</p>
          </div>
        </div>
        <div>
          <Dialog>
            <DialogTrigger>
              <Button>
                <Edit /> Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-center text-2xl">
                  EDIT PROFILE
                </DialogTitle>
                <DialogDescription>
                  <form
                    onSubmit={handleSubmitUpdateUserInfo}
                    className="space-y-4"
                  >
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        type="email"
                        id="email"
                        value={user?.email}
                        disabled
                      />
                    </div>
                    <div>
                      <Label htmlFor="userName">User Name</Label>
                      <Input
                        type="text"
                        id="userName"
                        value={updateUserInfo.userName}
                        onChange={handleChangeText}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="password">Password</Label>
                      <Input
                        type="password"
                        id="password"
                        value={updateUserInfo.password}
                        onChange={handleChangeText}
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "UPDATE PROFILE"
                      )}
                    </Button>
                  </form>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default Profile;
