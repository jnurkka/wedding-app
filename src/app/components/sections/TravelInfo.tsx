import Link from "next/link";
import { FaExternalLinkAlt } from "react-icons/fa";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card, CardContainer, CardTitle } from "../Card";
import { Dictionary } from "@/app/[lang]/types";



export const TravelInfo = ({ dict }: { dict: Dictionary }) => {
  const travelOptions = [
    {
      origin: "Bielefeld",
      description: dict.travelInfo.bielefeld,
      methods: [
        {
          description: "🚂 Bielefeld -> Neuburg (ca. 6-7h)",
          link: "https://maps.app.goo.gl/xhzMtynWqJrVGpW89",
        },
        {
          description: "oder 🚗 Bielefeld -> Neuburg (ca. 5,5h)",
          link: "https://maps.app.goo.gl/qfbRgyVoiKLH1vxMA",
        },
      ],
    },
    {
      origin: "Suomi",
      description: dict.travelInfo.finland,
      methods: [
        {
          description: "✈️ HKI -> MUC (2,5h)",
          link: "https://www.google.com/travel/flights/s/6Hxh57QEeQEJfaTU6",
        },
        {
          description: "🚂 MUC -> Neuburg (ca. 2h)",
          link: "https://maps.app.goo.gl/9YiMe5BNR8eTEdGw7",
        },
        {
          description: "tai 🚗 MUC -> Neuburg (50min)",
          link: "https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49",
        },
      ],
    },
    {
      origin: "München",
      description: dict.travelInfo.munich,
      methods: [
        {
          description: "🚂 München -> Neuburg (ca. 1,5h)",
          link: "https://maps.app.goo.gl/1hGFLBeLyw2tLVWG7",
        },
        {
          description: "or 🚗 München -> Neuburg (ca. 1h)",
          link: "https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49",
        },
      ],
    },
  ];


  return (
  <SectionContainer id="travel-info" bgColor="#E6D2C3">
    <SectionTitle value={dict.travelInfo.title} />
    <CardContainer cols={3}>
      {travelOptions.map((travelOption, index) => (
        <Card key={index}>
          <CardTitle value={travelOption.origin} />
          {travelOption.description && (
            <p className="mb-2 text-[#4A4238] max-sm:text-base">
              {travelOption.description}
            </p>
          )}
          <ul>
            {travelOption.methods.map((method, methodIndex) => (
              <li
                key={methodIndex}
                className="mb-2 text-[#4A4238] max-sm:text-base flex items-center justify-center"
              >
                {method.link ? (
                  <Link
                    href={method.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center"
                  >
                    {method.description}
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </Link>
                ) : (
                  <span>{` ${method.description} `}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </CardContainer>
  </SectionContainer>
);
};
