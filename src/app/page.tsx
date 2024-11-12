import { Metadata } from "next";


import HomePage from "@/components/Home";


export const metadata: Metadata = {
  title: "Happy-Invite",
  description: "Invite",
};

export default function Home() {
  return (
    <main>
      <HomePage />
      
    </main>
  );
}
