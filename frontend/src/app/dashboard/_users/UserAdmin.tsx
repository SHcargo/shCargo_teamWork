import { useState } from "react";
import MainDataTable from "../components/(features)/productCard";
type Props = {
  searchValue: string;
};
const UsersAdmin = ({ searchValue }: Props) => {
  return (
    <div>
      <div></div>
      <MainDataTable searchValue={searchValue} />
    </div>
  );
};

export default UsersAdmin;
