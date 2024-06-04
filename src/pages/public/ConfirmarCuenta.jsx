import React from 'react'

export default function ConfirmarCuenta() {
  return (
    <>
      <div className="bg-gray-100 flex items-center justify-center pt-20">
        <div className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4 radix-styled">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <div className="text-lg font-semibold text-gray-700">
            Tu cuenta ha sido activada
          </div>
        </div>
      </div>
    </>
  );
}
