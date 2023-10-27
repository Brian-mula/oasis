import { MoonLoader } from "react-spinners";
import TodayItem from "./TodayItem";
import { useTodayActivity } from "./useTodayActivity";

export default function TodayActivity() {
  const { todayActivity, isLoading } = useTodayActivity();
  

  return (
    <div className="bg-gray-50 border-gray-100 rounded-md p-12 flex flex-col gap-4 pt-9">
      <h3>Activities for the day</h3>
      {isLoading ? (
        <MoonLoader />
      ) : todayActivity.length === 0 ? (
        <p className="text-center">No activities for the day</p>
      ) : (
        <div className="overflow-y-auto overflow-x-hidden">
          {todayActivity.map((activity) => (
            <TodayItem key={activity.id} activity={activity} />
          ))}
        </div>
      )}
    </div>
  );
}
