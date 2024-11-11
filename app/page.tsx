"use client";

import { useState } from "react";

export default function Home() {
  const [name, setName] = useState("");
  const [partyCode, setPartyCode] = useState<number | "">("");
  const [joinPartyClicked, setJoinPartyClicked] = useState(false);

  function createParty() {
    if (name == "")
      return;
    
    const partyData = { name };

    alert(JSON.stringify(partyData));

    fetch("http://localhost:8080/api/mafia/party/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(partyData),
    })
      .then((response) => {
        if (response.ok) {
          response.json()
            .then((data) => {
              window.location.href = "/game"
            })
            .catch((error) => {
              console.log("Erro ao processar o corpo da resposta: " + error.message);
            });
        } else {
          alert("Falha ao criar partida");
        }
      })
      .catch((error) => {
        console.error("Erro na requisição:", error);
        alert("Erro na requisição: " + error.message);
      });
  }

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600">

      {
        joinPartyClicked?

        <div className="h-screen w-screen flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Cidade Dorme
          </h1>

          <input
            type="text"
            placeholder="Código da Partida"
            onChange={(e) => {
              const value = parseInt(e.target.value);
              setPartyCode(isNaN(value) ? "" : value);
            }}
            
            value={partyCode === "" ? "" : partyCode}
            className="w-[90%] sm:w-[400px] h-[50px] px-4 text-[#333] rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />

          <div className="w-screen flex flex-col sm:flex-row items-center justify-center gap-1">
            <div onClick={createParty} className="w-[90%] sm:w-[300px] h-[50px] bg-blue-600 text-white rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-700 active:scale-95">
              Entrar
            </div>

            <div className="w-[90%] sm:w-[300px] h-[50px] bg-gray-600 text-white rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-gray-700 active:scale-95"
            onClick={() => {
              setJoinPartyClicked(false);
            }}
            >
              Voltar
            </div>
          </div>

        </div>

        :

        <div className="h-screen w-screen flex flex-col justify-center items-center gap-6">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-6">
            Cidade Dorme
          </h1>

          <input
            type="text"
            placeholder="Seu nome"
            onChange={(e) => setName(e.target.value)}
            value={name}
            className="w-[90%] sm:w-[400px] h-[50px] px-4 text-[#333] rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
          />

          <div className="w-screen flex flex-col sm:flex-row items-center justify-center gap-1">

            <div className="w-[90%] sm:w-[300px] h-[50px] bg-blue-600 text-white rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-700 active:scale-95"
            onClick={() => {
              if (name != "")
                setJoinPartyClicked(true);
              }}
            >
              Entrar
            </div>

            <div onClick={createParty} className="w-[90%] sm:w-[300px] h-[50px] bg-blue-600 text-white rounded-lg flex justify-center items-center cursor-pointer transition-all duration-300 ease-in-out hover:bg-blue-700 active:scale-95">
              Criar Partida
            </div>
          </div>
        </div>
      }
    </div>
  );
}
