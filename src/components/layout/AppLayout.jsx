import { Outlet } from "react-router-dom";

export default function AppLayout() {

  return (
    <div className="min-h-screen flex flex-col bg-surface-lowest text-main select-none">

      <div>navbar</div>

      <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">
        <Outlet />
      </main>

      <div>footer</div>

    </div>
  );
}