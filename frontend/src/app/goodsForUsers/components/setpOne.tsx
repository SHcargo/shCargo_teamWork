import React from "react";

interface SetpOneProps {
  setStep: React.Dispatch<React.SetStateAction<string>>;
}

const SetpOne: React.FC<SetpOneProps> = ({ setStep }) => {
  return (
    <div>
      bugd
      <button onClick={() => setStep("Бүгд")}>Back to Бүгд</button>
    </div>
  );
};

export default SetpOne;
