import Image from "next/image";
import logo from "../../../../../public/assets/images/Logo.svg";
import { Brain, BookOpenCheck, RectangleEllipsis } from "lucide-react";

export default function AuthComponent() {
  return (
    <section className=" px-4 sm:px-32">
      <div className="logo relative mb-20">
        <Image
          src={logo}
          width={146}
          height={0}
          alt="Picture of the logo exam"
        />
      </div>

      <div className="text">
        <p className="font-bold text-3xl mb-7 text-gray-700">
          Empower your learning journey with our smart exam platform.
        </p>
      </div>

      <div className="app-list-auth space-y-4">
        <div className="list-item-auth flex gap-5 items-start flex-wrap justify-center md:flex-nowrap">
          <div className="list-icon-auth border p-1 border-maincolor w-fit">
            <Brain className="text-maincolor" />
          </div>

          <div className="list-text-auth">
            <h3 className="main-header-style">Tailored Diplomas</h3>
            <p>
              Choose from specialized tracks like Frontend, Backend, and Mobile
              Development.
            </p>
          </div>
        </div>

        <div className="list-item-auth flex gap-5 items-start flex-wrap justify-center md:flex-nowrap">
          <div className="list-icon-auth border p-1 border-maincolor">
            <BookOpenCheck className="text-maincolor" />
          </div>

          <div className="list-text-auth">
            <h3 className="main-header-style">Focused Exams</h3>
            <p>
              Access topic-specific tests including HTML, CSS, JavaScript, and
              more.
            </p>
          </div>
        </div>

        <div className="list-item-auth flex gap-5 items-start flex-wrap justify-center md:flex-nowrap">
          <div className="list-icon-auth border p-1 border-maincolor">
            <RectangleEllipsis className="text-maincolor" />
          </div>

          <div className="list-text-auth">
            <h3 className="main-header-style">Smart Multi-Step Forms</h3>
            <p>
              Choose from specialized tracks like Frontend, Backend, and Mobile
              Development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
