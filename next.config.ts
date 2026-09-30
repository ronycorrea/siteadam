import type { NextConfig } from "next";
import { basePath } from "./src/lib/site";

if (!/^(?:\/[A-Za-z0-9_-][A-Za-z0-9._-]*)*$/.test(basePath)) {
  throw new Error(
    "NEXT_PUBLIC_BASE_PATH deve ser vazio ou um caminho como /siteadam.",
  );
}

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
};
export default nextConfig;
