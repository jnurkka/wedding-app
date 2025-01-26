import Link from "next/link";
import { FaCar, FaExternalLinkAlt, FaPlane, FaTrain } from "react-icons/fa";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";
import { Card, CardContainer, CardTitle } from "../Card";

const travelOptions = [
  {
    origin: "Bielefeld",
    methods: [
      {
        icon: <FaTrain className="text-[#4A4238] mr-2" />,
        description: "Bielefeld to Neuburg (ca. 6-7h)",
        link: "https://maps.app.goo.gl/xhzMtynWqJrVGpW89",
      },
      {
        icon: <FaCar className="text-[#4A4238] mr-2" />,
        description: "Bielefeld to Neuburg (ca. 5,5h)",
        link: "https://maps.app.goo.gl/qfbRgyVoiKLH1vxMA",
      },
    ],
  },
  {
    origin: "Finland",
    methods: [
      {
        icon: <FaPlane className="text-[#4A4238] mr-2" />,
        description: "HKI to MUC (2,5h)",
        link: "https://www.google.com/travel/flights/s/6Hxh57QEeQEJfaTU6",
      },
      {
        icon: <FaTrain className="text-[#4A4238] mr-2" />,
        description: "MUC to Neuburg (ca. 1,5h)",
        link: "https://maps.app.goo.gl/9YiMe5BNR8eTEdGw7",
      },
      {
        icon: <FaCar className="text-[#4A4238] mr-2" />,
        description: "MUC to Neuburg (50min)",
        link: "https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49",
      },
    ],
  },
  {
    origin: "München",
    methods: [
      {
        icon: <FaTrain className="text-[#4A4238] mr-2" />,
        description: "München to Neuburg (ca. 1,5h)",
        link: "https://maps.app.goo.gl/1hGFLBeLyw2tLVWG7",
      },
      {
        icon: <FaCar className="text-[#4A4238] mr-2" />,
        description: "München to Neuburg (ca. 1h)",
        link: "https://maps.app.goo.gl/Ui5RGtTE5cgHsnv49",
      },
    ],
  },
];

export const TravelInfo = () => (
  <SectionContainer bgColor="#E6D2C3">
    <SectionTitle value="How to Get There" color="#4A4238" />
    <CardContainer cols={3}>
      {travelOptions.map((travelOption, index) => (
        <Card key={index}>
          <CardTitle value={travelOption.origin} />
          <ul>
            {travelOption.methods.map((method, methodIndex) => (
              <li
                key={methodIndex}
                className="mb-2 text-[#4A4238] max-sm:text-base flex items-center justify-center"
              >
                {method.icon}
                {method.link ? (
                  <Link
                    href={method.link}
                    target="_blank"
                    className="hover:underline flex items-center"
                  >
                    {method.description}
                    <FaExternalLinkAlt className="ml-2 text-sm" />
                  </Link>
                ) : (
                  <span>{method.description}</span>
                )}
              </li>
            ))}
          </ul>
        </Card>
      ))}
    </CardContainer>
  </SectionContainer>
);
