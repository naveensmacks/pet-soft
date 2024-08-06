import Logo from "@/components/logo";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen">
      <Logo />
      {children}
    </div>
  );
}