"use client";

import { Button } from "@material-tailwind/react";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">
        Hello Material Tailwind v3
      </h1>
      <Button color="blue">Click Me</Button>
    </main>
  );
}
