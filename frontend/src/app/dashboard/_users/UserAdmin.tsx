import MainDataTable from "../components/(features)/productCard";
type Props = {
  searchValue: string;
  setSearchValue: (val: string) => void;
};

const UsersAdmin = ({ searchValue, setSearchValue }: Props) => {
  return (
    <div>
      <MainDataTable
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default UsersAdmin;
