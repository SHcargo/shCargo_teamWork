import Delivery from "./_components/Delivery";
import DeliveryAddress from "./_components/DeliveryAddress";
import PersonalInformation from "./_components/PersonalInformation";

const Profile = () => {
  return (
    <div className="max-w-2xl w-full h-screen p-4 flex flex-col bg-[#e9ecef]">
      <div className="overflow-scroll w-full h-auto flex flex-col gap-4">
        <Delivery />
        <PersonalInformation />
        <DeliveryAddress />
      </div>
    </div>
  );
};

export default Profile;
