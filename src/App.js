import { useState, useEffect } from "react";

export default function App() {
  const [a, setA] = useState("200");
  const [b, setB] = useState(0.3);
  const [d, setD] = useState(0.1);
  const [e, setE] = useState("1400");
  const [isEditingE, setIsEditingE] = useState(false);

  const aNum = parseFloat(a) || 0;
  const eNum = parseFloat(e) || 0;
  const c = 1 - b;
  const bAmt = aNum * b;
  const cAmt = aNum * c;
  const d22 = eNum !== 0 ? bAmt / eNum : 0;

  useEffect(() => {
    if (!isEditingE && !isNaN(cAmt) && d !== 0) {
      const updatedE = (cAmt / d).toFixed(2);
      setE(updatedE);
    }
  }, [a, b, d]);

  const handleEChange = (val) => {
    setIsEditingE(true);
    setE(val);
    const newE = parseFloat(val);
    if (!isNaN(newE) && newE !== 0) {
      const toPSC = newE * d;
      const newA = toPSC / c;
      setA(newA.toFixed(2));
    }
  };

  const handleEBlur = () => {
    setIsEditingE(false);
  };

  const styles = {
    nodeBox: {
      background: "white",
      borderRadius: 16,
      padding: 10,
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
      textAlign: "center",
      fontWeight: "bold",
      fontSize: 18,
      minWidth: 180,
    },
    connector: {
      stroke: "gray",
      strokeWidth: 2,
    },
    red: { color: "red" },
    navy: { color: "#003366" },
    purple: { color: "purple" },
    input: {
      padding: 8,
      border: "1px solid #ccc",
      borderRadius: 6,
      fontSize: 18,
      fontWeight: "bold",
    },
  };

  return (
    <div style={{ background: "#f4f4f7", minHeight: "100vh", padding: 20, fontWeight: "bold" }}>
      <div style={{ position: "relative", width: "100%", height: 500 }}>
        <svg width="100%" height="100%" style={{ position: "absolute", top: 0, left: 0 }}>
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill="gray" />
            </marker>
          </defs>
          <line x1="50%" y1="10%" x2="30%" y2="35%" style={styles.connector} markerEnd="url(#arrow)" />
          <line x1="50%" y1="10%" x2="70%" y2="35%" style={styles.connector} markerEnd="url(#arrow)" />
          <line x1="70%" y1="35%" x2="70%" y2="55%" style={styles.connector} markerEnd="url(#arrow)" />
          <line x1="70%" y1="55%" x2="50%" y2="80%" style={styles.connector} markerEnd="url(#arrow)" />
        </svg>

        <div style={{ position: "absolute", top: "5%", left: "50%", transform: "translateX(-50%)" }}>
          <Box label="COUNTRY OFFICE COSTS (A)" value={<><span style={styles.navy}>${aNum.toFixed(2)}</span></>} style={styles.nodeBox} />
        </div>
        <div style={{ position: "absolute", top: "30%", left: "30%", transform: "translateX(-50%)" }}>
          <Box
            label="TO PROJECTS (B)"
            value={
              <>
                <div style={styles.red}>{(b * 100).toFixed(0)}%</div>
                <div style={styles.navy}>${bAmt.toFixed(0)}</div>
                <div style={styles.purple}>{(d22 * 100).toFixed(2)}%</div>
              </>
            }
            style={styles.nodeBox}
          />
        </div>
        <div style={{ position: "absolute", top: "30%", left: "70%", transform: "translateX(-50%)" }}>
          <Box
            label="TO PSC (C = 1 - B)"
            value={
              <>
                <div style={styles.red}>{(c * 100).toFixed(0)}%</div>
                <div style={styles.navy}>${cAmt.toFixed(0)}</div>
              </>
            }
            style={styles.nodeBox}
          />
        </div>
        <div style={{ position: "absolute", top: "50%", left: "70%", transform: "translateX(-50%)" }}>
          <Box label="ADMIN FEE (D)" value={<span style={styles.red}>{(d * 100).toFixed(0)}%</span>} style={styles.nodeBox} />
        </div>
        <div style={{ position: "absolute", top: "75%", left: "50%", transform: "translateX(-50%)" }}>
          <Box
            label={`BREAK-EVEN BUSINESS VOLUME (E)
E = A*C / D`}
            value={<span style={styles.navy}>${eNum.toFixed(2)}</span>}
            large
            style={styles.nodeBox}
          />
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", gap: 10, marginTop: 40 }}>
        <Field label="Country Office Cost (A)" value={a} onChange={setA} inputStyle={styles.input} />
        <Field label="% to Projects (B)" value={b} step="0.01" onChange={setB} inputStyle={styles.input} />
        <Field label="Admin Fee (D)" value={d} step="0.01" onChange={setD} inputStyle={styles.input} />
        <Field
          label="Break-even Volume (E)"
          value={e}
          onChange={handleEChange}
          onBlur={handleEBlur}
          inputStyle={styles.input}
        />
      </div>
    </div>
  );
}

function Box({ label, value, large, style }) {
  return (
    <div style={{ ...style, fontSize: large ? 20 : 18 }}>
      <div style={{ fontWeight: "bold" }}>{label}</div>
      <div style={{ marginTop: 4, whiteSpace: "pre-line" }}>{value}</div>
    </div>
  );
}

function Field({ label, value, onChange, step = "1", inputStyle, onBlur }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minWidth: 180 }}>
      <label style={{ fontSize: 18, fontWeight: "bold" }}>{label}:</label>
      <input
        type="text"
        value={value}
        step={step}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        style={inputStyle}
      />
    </div>
  );
}
