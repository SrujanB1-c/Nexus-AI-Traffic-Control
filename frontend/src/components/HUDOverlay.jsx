export default function HUDOverlay() {

  return (

    <div
      className="
      absolute
      inset-0
      pointer-events-none
    "
    >

      <div
        className="
        absolute
        top-5
        left-5
        text-cyan-400
      "
      >
        AI TRAFFIC NEXUS
      </div>

      <div
        className="
        absolute
        top-5
        right-5
      "
      >
        SYSTEM ONLINE
      </div>

      <div
        className="
        absolute
        bottom-5
        left-5
      "
      >
        DIGITAL TWIN ACTIVE
      </div>

    </div>

  );
}