import React, { useState } from "react";
import SignalList from "./components/SignalList";
import FetchButton from "./components/FetchButton";

function App() {
  const [signals, setSignals] = useState([]);

  const fetchSignals = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/market/daily-signals?tickers=PETR4.SA,VALE3.SA,ITUB4.SA,BBDC4.SA,ABEV3.SA,BBAS3.SA,B3SA3.SA,WEGE3.SA,RENT3.SA,LREN3.SA,MGLU3.SA,VIVT3.SA,GGBR4.SA,CSNA3.SA,SUZB3.SA,JBSS3.SA,RAIL3.SA,KLBN11.SA,EGIE3.SA,EQTL3.SA,TIMS3.SA,CPLE6.SA,PRIO3.SA,CVCB3.SA,TOTS3.SA,HAPV3.SA,CYRE3.SA,BRKM5.SA&interval=1d`
      );
      const data = await response.json();
      const filteredSignals = data.filter(signal => signal.buy || signal.sell); // Filtrar solo señales de compra/venta
      setSignals(filteredSignals);
    } catch (error) {
      console.error("Error fetching signals:", error);
    }
  };

  return (
    <div className="App">
      <h1>Market Signals</h1>
      <FetchButton onClick={fetchSignals} />
      <SignalList signals={signals} />
    </div>
  );
}

export default App;
