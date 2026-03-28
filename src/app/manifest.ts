import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Miwim — Decentralized Proxy Infrastructure",
    short_name: "Miwim",
    description:
      "DePIN-powered proxy network with decentralized VPN and residential IPs.",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#2aa198",
  };
}
