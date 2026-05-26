import React from "react"
export default function Preview({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        border: "1px solid var(--ifm-color-emphasis-300)",
        borderRadius: "12px",
        padding: "24px",
        background: "var(--ifm-background-color)",
        marginBottom: "16px"
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          alignItems: "center",
          flexWrap: "wrap"
        }}
      >
        {children}
      </div>
    </div>
  )
}