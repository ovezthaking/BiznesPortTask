import MessageForm from "./components/MessageForm";
import MessagesTable from "./components/MessagesTable";


export default function Home() {
  return (
    <>
      <header className="bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          {/* Nagłówek */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900">
              Wiadomości
            </h1>
            <p className="text-gray-600 mt-2">
              Zarządzaj swoimi wiadomościami
            </p>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Formularz dodawania */}
          <MessageForm />

          {/* Tabela wiadomości */}
          <MessagesTable />
        </div>
      </main>
    </>
  )
}