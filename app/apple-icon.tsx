import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180
};

export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(circle at top left, rgba(125, 211, 252, 0.9), transparent 38%), linear-gradient(135deg, #f8fbff 0%, #e0f2fe 100%)"
        }}
      >
        <div
          style={{
            width: 112,
            height: 112,
            borderRadius: 32,
            background: "linear-gradient(160deg, #0f766e, #0369a1)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#f8fafc",
            fontSize: 36,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.24)"
          }}
        >
          NM
        </div>
      </div>
    ),
    {
      width: 180,
      height: 180
    }
  );
}
