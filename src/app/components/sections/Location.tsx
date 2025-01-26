import Link from "next/link";
import { FaMapMarkerAlt, FaExternalLinkAlt } from "react-icons/fa";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card, CardTitle } from "../Card";

export const Location = () => (
  <SectionContainer bgImage="/hotel.webp" bgColor="white">
    <SectionTitle value="Location" color="white" />
    <Card>
      <CardTitle value="Acker Alm & Hotel" />
      <div className="flex items-center justify-center mb-4">
        <FaMapMarkerAlt className="text-[#4A4238] mr-2 text-2xl" />
        <Link
          href="https://maps.app.goo.gl/xt5eNL8YHXWdX9BJ7"
          target="_blank"
          className="text-[#4A4238] text-lg hover:underline flex items-center"
        >
          Am Machinenring, 86633 Neuburg an der Donau
          <FaExternalLinkAlt className="ml-2 text-sm" />
        </Link>
      </div>
      <div className="text-[#4A4238] text-base space-y-2 mb-4">
        <p>
          Wedding ceremony, party location (both Friday and Saturday) and
          accomondation for everyone in one place. One minute walking distance
          between hotel and party location.
        </p>
        <p>
          <Link
            href="https://maps.app.goo.gl/6yNbatiLMjMrRTQ57"
            target="_blank"
            className="ml-1 hover:underline"
          >
            Two km to the beautiful old town of Neuburg on the Danube river{" "}
            <FaExternalLinkAlt className="ml-1 inline text-sm" />
          </Link>
        </p>
      </div>
    </Card>
  </SectionContainer>
);
