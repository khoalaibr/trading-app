import React, { useState } from "react";
import axios from "axios";
import { B3_ACTIONS, AMERICAN_ACTIONS } from "./actions";

const App = () => {
  const [selectedTickers, setSelectedTickers] = useState([]);
  const [results, setResults] = useState([]);

  const handleCheckboxChange = (ticker) => {
    setSelectedTickers((prev) =>
      prev.includes(ticker)
        ? prev.filter((item) => item !== ticker) // Elimina si ya está seleccionado
        : [...prev, ticker] // Agrega si no está seleccionado
    );
  };

  const fetchSignals = async () => {
    if (selectedTickers.length === 0) {
      alert("Selecciona al menos una acción");
      return;
    }

    const baseUrl = import.meta.env.VITE_API_URL;
    if (!baseUrl) {
      console.error("La variable REACT_APP_API_BASE_URL no está definida");
      alert("Error interno: Base URL no configurada");
      return;
    }

    try {
      const response = await axios.get(`${baseUrl}/market/daily-signals`, {
        params: {
          tickers: selectedTickers.join(","),
          interval: "1d",
        },
      });
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching signals:", error);
      alert("Error al consultar las señales");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Consulta de Señales</h1>

      <h2>Acciones de B3</h2>
      <div style={{ marginBottom: "20px" }}>
        {B3_ACTIONS.map((ticker) => (
          <label key={ticker} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value={ticker}
              onChange={() => handleCheckboxChange(ticker)}
            />
            {ticker}
          </label>
        ))}
      </div>

      <h2>Acciones Americanas</h2>
      <div style={{ marginBottom: "20px" }}>
        {AMERICAN_ACTIONS.map((ticker) => (
          <label key={ticker} style={{ marginRight: "10px" }}>
            <input
              type="checkbox"
              value={ticker}
              onChange={() => handleCheckboxChange(ticker)}
            />
            {ticker}
          </label>
        ))}
      </div>

      <button onClick={fetchSignals} style={{ marginBottom: "20px" }}>
        Consultar Señales:
      </button>

      <h2>Resultados:</h2>
      <div>
        {results.map(({ ticker, buy, sell, currentPrice }) => (
          <div key={ticker}>
            <strong>{ticker}</strong>: {buy ? "Compra" : sell ? "Venta" : "Sin señal"} - Precio: {currentPrice}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
