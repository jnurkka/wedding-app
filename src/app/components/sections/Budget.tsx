import React from "react";
import { Card, CardContainer, CardTitle } from "../Card";
import { FaCalculator, FaEuroSign } from "react-icons/fa";
import { SectionContainer } from "../SectionContainer";
import { SectionTitle } from "../SectionTitle";

export const Budget = () => {
  return (
    <SectionContainer bgColor="#E6D2C3">
      <SectionTitle value="Budget" color="#4A4238" />
      <CardContainer cols={2}>
        <Card>
          <CardTitle value="Important Considerations" />
          <div className="space-y-4 text-[#4A4238]">
            <p>
              We understand that showing up itself represents a significant financial investment for most of you. We wanted to have a full-weekend celebration to make the long travel worth it, and want to be fully transparent about the expected costs to avoid any surprises.
            </p>
            <ul className="list-disc list-inside">
              Friday: Guests pay for their own food and drinks<br/>
              Saturday: All food and drinks are on us<br/>
              We've negotiated special rates for accommodation to keep your costs down<br/>
              Please don't feel obliged to spend even more money on a present, you coming to celebrate with us is more than we could ask for!
            </ul>
          </div>
        </Card>

        <Card>
          <CardTitle value="Cost Estimate (2 persons from Finland)" />
          <div className="space-y-4 text-[#4A4238]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Accommodation</p>
                <p>2 nights × 144€</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€288</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Flights (HEL-MUC)</p>
                <p>2 persons × 300€</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€600</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="font-semibold">Airport Transport</p>
                <p>2 persons × 32€ × 2 ways</p>
              </div>
              <div className="text-right">
                <p className="font-bold">€128</p>
              </div>
            </div>
            <div className="border-t pt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="font-bold">Total Estimated Cost</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">€1,016</p>
              </div>
            </div>
          </div>
        </Card>
      </CardContainer>
    </SectionContainer>
  );
};