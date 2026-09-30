"use client";
import { useState } from "react";
import { evolution } from "@/data/project";
export default function Timeline() {
  const [selected, setSelected] = useState(5);
  return (
    <div className="timeline">
      <div className="timeline-tabs">
        {evolution.map(([title], i) => (
          <button
            key={title}
            className={selected === i ? "active" : ""}
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>0{i + 1}</span>
            <strong>{title}</strong>
          </button>
        ))}
      </div>
      <div className="timeline-detail" aria-live="polite">
        <span>0{selected + 1}</span>
        <div>
          <h3>{evolution[selected][0]}</h3>
          <p>{evolution[selected][1]}</p>
        </div>
      </div>
    </div>
  );
}
