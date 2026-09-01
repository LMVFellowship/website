import { readFile } from "node:fs/promises";
import path from "node:path";
import Image from "next/image";

const LOGO_FILE = "logo.gif";
const LOGO_PATH = path.join(process.cwd(), "public", LOGO_FILE);

/**
 * Reads the intrinsic size straight out of the GIF header so the logo can be
 * swapped for a different file without anyone having to update hardcoded
 * dimensions here. The logical screen descriptor puts width and height at
 * bytes 6-9 as little-endian uint16s, right after the "GIF89a" signature.
 */
async function readLogo() {
  try {
    const header = (await readFile(LOGO_PATH)).subarray(0, 10);

    if (header.length < 10 || header.subarray(0, 3).toString("latin1") !== "GIF") {
      console.warn(`public/${LOGO_FILE} is not a GIF — falling back to the wordmark.`);
      return null;
    }

    return {
      width: header.readUInt16LE(6),
      height: header.readUInt16LE(8),
    };
  } catch {
    // No logo dropped in yet — the text wordmark stands in for it.
    return null;
  }
}

export default async function Logo() {
  const logo = await readLogo();

  if (!logo) {
    return (
      <p className="text-center font-script text-6xl font-normal leading-none [word-spacing:0.35em] sm:text-7xl">
        <span aria-hidden="true">_</span>love made visible
      </p>
    );
  }

  return (
    <Image
      src={`/${LOGO_FILE}`}
      alt="_love made visible"
      width={logo.width}
      height={logo.height}
      // Optimization would flatten the animation to a still frame.
      unoptimized
      priority
      className="h-auto w-full max-w-[560px]"
    />
  );
}
