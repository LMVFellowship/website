import Logo from "./logo";

/**
 * Full-screen wordmark that plays once and then uncovers the page.
 *
 * Deliberately CSS-only. A JavaScript overlay that failed to unmount — a
 * hydration error, a blocked bundle, JS disabled — would leave a black sheet
 * over the whole site with no way past it. A CSS animation with
 * `forwards` fill always finishes, so the page is always reachable.
 *
 * The page itself renders underneath from the first paint, so crawlers and
 * screen readers never see the splash as a gate; it is aria-hidden and
 * stops intercepting pointer events as soon as it starts fading.
 */
export default function Splash() {
  return (
    <div aria-hidden="true" className="lmv-splash">
      <div className="lmv-splash__mark">
        <Logo className="h-auto w-full max-w-[620px]" />
      </div>
    </div>
  );
}
