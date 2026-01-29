import MessageForm from "./components/MessageForm";
import MessagesTable from "./components/MessagesTable";


export default function Home() {
  return (
    <>
      <header className="bg-primary p-8 pl-12 text-primary-foreground">
        <div className="mx-auto">
          <div className="">
            <h1 className="text-4xl font-bold">
              Wiadomości
            </h1>
            <p className="text-gray-300 mt-2">
              Zarządzaj swoimi wiadomościami
            </p>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-primary/20 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <MessageForm />

  
          <MessagesTable />
        </div>
      </main>
    </>
  )
}