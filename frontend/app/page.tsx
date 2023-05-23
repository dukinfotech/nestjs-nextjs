import ClientComponent from "../components/ClientComponent";
import ServerComponent from "../components/ServerComponent";

export default function Home() {
  return (
    <main>
      <ClientComponent />
      {/* @ts-expect-error Server Component */}
      <ServerComponent />
    </main>
  )
}