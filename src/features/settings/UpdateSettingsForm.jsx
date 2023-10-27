import Loaded from "../../ui/Loaded";
import { useSettings } from "./useSettings";
import { useUpdateSettings } from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, settings } = useSettings();
  const { isUpdating, updateSetting } = useUpdateSettings();

  const {
    maxBookingLength,
    minBookingLength,
    maxGuestsPerCabin,
    breakFastPrice,
  } = settings || {};

  const handleUpdateSetting = (e, field) => {
    const { value } = e.target;
    if(!value) return;

    updateSetting({ [field]: value });
  };

  if (isLoading) return <Loaded />;
  return (
    <div className="flex justify-center">
      <form className="w-full max-w-lg mx-6 mt-4">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-80">
            <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
              Maximum Nights/Booking
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              defaultValue={maxBookingLength}
              disabled={isUpdating}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
              onBlur={(e) => handleUpdateSetting(e, "maxBookingLength")}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-80">
            <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
              Minimum Nights/Booking
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              disabled={isUpdating}
              defaultValue={minBookingLength}
              onBlur={(e) => handleUpdateSetting(e, "minBookingLength")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-80">
            <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
              Maximum Guests/Booking
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              disabled={isUpdating}
              defaultValue={maxGuestsPerCabin}
              onBlur={(e) => handleUpdateSetting(e, "maxGuestsPerCabin")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6 ">
          <div className="md:w-80">
            <label className="block text-gray-500 font-bold md:text-start mb-1 md:mb-0 pr-4">
              Breakfast Price
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              disabled={isUpdating}
              defaultValue={breakFastPrice}
              onBlur={(e) => handleUpdateSetting(e, "breakFastPrice")}
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="number"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

export default UpdateSettingsForm;
