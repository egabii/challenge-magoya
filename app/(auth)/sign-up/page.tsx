import { NewAccountCard } from "../components/new-account-card";
export default function Root() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
          <div className="absolute inset-0 bg-lime-200" />
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[450px]">
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <NewAccountCard />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
