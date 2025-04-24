import Delivery from "./_components/Delivery";
import DeliveryAddress from "./_components/DeliveryAddress";

const Profile = () => {
  return (
    <div className="max-w-2xl w-full h-full flex flex-col gap-4 p-4 bg-[#e9ecef]">
      <Delivery />
      <DeliveryAddress />
    </div>
  );
};

export default Profile;
