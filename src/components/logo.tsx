import Link from "next/link";
import logo from "../../public/logo.svg";
import Image from "next/image";
export default function Logo() {
  return (
    <Link href="/">
      <Image src={logo} alt="PetSoft logo" />
    </Link>
  );
}
