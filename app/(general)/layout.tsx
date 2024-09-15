import type { Metadata } from "next";
import ButtonCloseSession from "@/components/button-close-session";
import { LinkedInLogoIcon, GitHubLogoIcon } from "@radix-ui/react-icons";

export const metadata: Metadata = {
  title: "Home Next Bank",
  description: "The new neobank for agrotech",
};

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isSessionActive = true;
  return (
    <div className="w-full grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 px-0 gap-16 font-[family-name:var(--font-geist-sans)]">
      <nav className="w-full flex gap-6 flex-wrap items-center justify-between bg-green-500 p-10">
        <h1>Next Bank</h1>
        {isSessionActive && <ButtonCloseSession />}
      </nav>
      <main className="w-full flex flex-col gap-8 row-start-2 md:items-center sm:items-start">
        {children}
      </main>
      <footer className="w-full row-start-3 flex gap-6 flex-wrap items-center justify-center bg-slate-200 p-10">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://www.linkedin.com/in/mullergabriel/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInLogoIcon aria-hidden width={16} height={16} />
          Meet the author
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/egabii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubLogoIcon aria-hidden width={16} height={16} />
          Done by Gabriel Muller
        </a>
      </footer>
    </div>
  );
}
