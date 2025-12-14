import { Metadata } from "next";
import HomeComponent from "./(app)/_components/home-component";

export const metadata: Metadata = {
  title: "Exam App",
  description: " Elevate Exam App",
};
// =======================================================================================================
export default function AppPage() {
  return (
    <>
      <HomeComponent />
    </>
  );
}
