"use client";
import { usePetContext } from "@/lib/hooks";

export default function Stats() {
  const { noOfPets } = usePetContext();
  return (
    <section className="text-center">
      <p className="text-2xl font-bold leading-6">{noOfPets}</p>
      <p className="opcatiy-80">current guests</p>
    </section>
  );
}
