import { Accommodation } from "../components/sections/Accomodation";
import { Budget } from "../components/sections/Budget";
import { Landing } from "../components/sections/Landing";
import { Location } from "../components/sections/Location";
import { Program } from "../components/sections/Program";
import { Response } from "../components/sections/Response";
import { TravelInfo } from "../components/sections/TravelInfo";
import { Registration } from "../data";

export const SaveTheDate = ({
  registration,
  submitRegistration,
}: {
  registration: Registration | null;
  submitRegistration: (registration: Registration) => Promise<string>;
}) => {
  return (
    <div className="snap-y snap-mandatory h-screen w-screen overflow-y-scroll">
      <Landing start="19.09." end="21.09.2025" />
      <Program />
      <Location />
      <Accommodation />
      <TravelInfo />
      <Budget />
      <Response
        registration={registration}
        submitRegistration={submitRegistration}
      />
    </div>
  );
};
