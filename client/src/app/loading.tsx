export default function Loading() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-blue-600 animate-spin"></div>
        </div>
        <h2 className="text-xl font-medium text-gray-700 animate-pulse">
          Cargando...
        </h2>
        <p className="text-sm text-gray-500">
          Por favor espere mientras preparamos todo
        </p>
      </div>
    </div>
  );
}
