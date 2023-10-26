
import { MoonLoader } from "react-spinners";
import { useUser } from "../authentication/useUser";

export default function UserDetails() {
  const { isLoading, user } = useUser();

  return (
    <div className="flex flex-col justify-center h-[calc(100vh-7rem)] w-[calc(100vw-17rem)]">
      <div className=" ml-auto mr-auto">
        {isLoading && <MoonLoader color="#36d7b7" />}
        {user && (
          <>
            <img
              src={`${user?.user_metadata.avater || "/default-user.jpg"}`}
              alt=""
              className="h-32 w-32 rounded-full object-cover"
            />
            <p className="font-normal text-lg py-4">{user?.user_metadata.name}</p>
            <p className="font-normal text-lg py-4">{user?.email}</p>
          </>
        )}
      </div>
    </div>
  );
}
