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
      {/* 12323 */}
    </div>
  );
};

export default UsersAdmin;
