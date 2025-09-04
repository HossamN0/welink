import { authOptions } from "@/server/auth";
import { getServerSession } from "next-auth";
import HeroSection from "./_components/hero-section";

export default async function Home() {

  const session = await getServerSession(authOptions)

  return (
    <main>
      <HeroSection session={session!} />
    </main>

  );
}
