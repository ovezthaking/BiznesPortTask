import MessageForm from "./components/MessageForm";
import MessagesTable from "./components/MessagesTable";


export default function Home() {
  return (
    <>
      <header className="bg-primary p-6 pl-12 text-primary-foreground w-full">
        <div className="mx-auto">
          <div className="">
            <h1 className="text-3xl font-bold">
              Wiadomości
            </h1>
            <p className="text-gray-300 mt-2">
              Zarządzaj swoimi wiadomościami
            </p>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-primary/20 p-8">
        <div className="max-w-6xl mx-auto space-y-8 mt-10 mb-10">
          <MessageForm />

          <MessagesTable />
        </div>
      </main>

      <footer className="bg-primary p-6 pl-12 text-primary-foreground w-full text-center">
        <p className="text-sm">2026 © Oliwer Urbaniak</p>
      </footer>
    </>
  )
}