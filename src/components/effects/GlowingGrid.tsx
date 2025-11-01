export default function GlowingGrid() {
  return (
    <div className="fixed inset-0 z-[-1] opacity-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,102,0.1),transparent_50%)]"></div>
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,255,102,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,102,0.05) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>
    </div>
  );
}
