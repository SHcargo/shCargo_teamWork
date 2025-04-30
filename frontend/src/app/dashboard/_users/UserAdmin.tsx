import MainDataTable from "../components/(features)/productCard";
type Props = {
  searchValue: string;
};
const UsersAdmin = ({ searchValue }: Props) => {
  return (
    <div>
      <MainDataTable searchValue={searchValue} />
    </div>
  );
};

export default UsersAdmin;
