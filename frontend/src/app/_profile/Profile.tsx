import DeliveryAddress from "./_components/DeliveryAddress";
import ChangePhoneNumber from "./_components/ChangePhoneNumber";
import PersonalInformation from "./_components/PersonalInformation";
import ChangePassword from "./_components/ChangePassword";

const Profile = () => {
  return (
    <div className="max-w-2xl w-full h-auto p-4 flex flex-col bg-[#e9ecef]">
      <div className="overflow-scroll w-full h-auto flex flex-col gap-4">
        <PersonalInformation />
        <ChangePhoneNumber />
        <ChangePassword />
        <DeliveryAddress />
      </div>
    </div>
  );
};

export default Profile;
