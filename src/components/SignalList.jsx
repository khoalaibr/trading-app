import React from "react";

function SignalList({ signals }) {
  return (
    <div>
      <h2>Signals</h2>
      {signals.length === 0 ? (
        <p>No hay señales de Compra/Venta</p>
      ) : (
        <ul>
          {signals.map((signal, index) => (
            <li key={index}>
              <strong>{signal.ticker}</strong>:{" "}
              {signal.buy ? "Comprar" : "Vender"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SignalList;
