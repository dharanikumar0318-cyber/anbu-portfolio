import type { NextConfig } from "next";

// Comprehensive Content Security Policy (CSP)
const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://challenges.cloudflare.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: blob: https:;
  font-src 'self' data: https://fonts.gstatic.com;
  connect-src 'self' https:;
  frame-src 'self' https://challenges.cloudflare.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
  object-src 'none';
  upgrade-insecure-requests;
`.replace(/\s{2,}/g, ' ').trim();

const securityHeaders = [
  // 1. HTTP Strict Transport Security (HSTS): 2 years + subdomains + preload
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  // 2. Cross-Site Scripting (XSS) & Resource Injection Defense (CSP)
  {
    key: 'Content-Security-Policy',
    value: cspHeader,
  },
  // 3. Clickjacking Protection
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  // 4. MIME-Sniffing Prevention
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  // 5. Referrer Leakage Prevention
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  // 6. Browser Feature & Hardware Restriction (Permissions Policy)
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=(), payment=(), usb=(), vr=(), accelerometer=(), gyroscope=()',
  },
  // 7. Isolation & Process Sandboxing
  {
    key: 'Cross-Origin-Opener-Policy',
    value: 'same-origin',
  },
  {
    key: 'Cross-Origin-Resource-Policy',
    value: 'same-origin',
  },
  // 8. DNS Prefetch Control
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
];

const nextConfig: NextConfig = {
  // Hide framework technology signature (removes X-Powered-By: Next.js)
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
