import { authOption } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import LayoutWrapper from "./LayoutWrapper";

interface LayoutProps {
  children: React.ReactNode;
}
const Layout = async ({ children }: LayoutProps) => {
  const session = await getServerSession(authOption);
  if (!session) notFound();

  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
