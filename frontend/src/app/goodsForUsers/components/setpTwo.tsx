import React from "react";

interface SetpOneProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

const SetpTwo: React.FC<SetpOneProps> = ({ setStep }) => {
  return <div>burtgesen</div>;
};

export default SetpTwo;
