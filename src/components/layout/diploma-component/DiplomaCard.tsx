"use client"
import Image from "next/image";
import { Subject } from "@/lib/types/diplomas";
import Link from "next/link";

type DiplomaCardProps = {
  diplomas: Subject[];
};

export default function DiplomaCard({ diplomas }: DiplomaCardProps) {


  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-6">
      {diplomas.map((subject) => (
        <Link href={`/exams-${subject._id}`} key={subject._id} className="relative h-48">
          <Image
            src={subject.icon}
            alt={subject.name}
            className="object-cover"
            style={{
              width: "100%",
              height: "100%",
            }}
            width={500}
            height={0}
          />
          <p className=" text-white font-semibold text-xl absolute bottom-3 w-[90%] left-[50%] -translate-x-[50%] text-center bg-[#155DFC80] blur-[6] p-3">{subject.name}</p>
        </Link>
      ))}
    </div>
  );
}
