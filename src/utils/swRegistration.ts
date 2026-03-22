// Service Worker Registration & Management

export async function registerServiceWorker() {
  if (!("serviceWorker" in navigator)) {
    console.warn("Service Workers not supported in this browser");
    return null;
  }

  try {
    // Import SW as a module worker (requires Vite bundling)
    const swUrl = new URL("../../../public/sw.ts", import.meta.url).pathname;
    
    const registration = await navigator.serviceWorker.register(swUrl, {
      scope: "/",
      type: "module",
    });

    console.info("✓ Service Worker registered successfully", registration);

    // Listen for updates
    registration.addEventListener("updatefound", () => {
      const newWorker = registration.installing;
      if (newWorker) {
        newWorker.addEventListener("statechange", () => {
          if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
            console.info("✓ Service Worker update available");
            // Could trigger a notification here
          }
        });
      }
    });

    return registration;
  } catch (error) {
    console.error("Service Worker registration failed:", error);
    return null;
  }
}

export async function unregisterServiceWorker() {
  if (!("serviceWorker" in navigator)) return;

  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    for (const registration of registrations) {
      await registration.unregister();
    }
    console.info("✓ All Service Workers unregistered");
  } catch (error) {
    console.error("Service Worker unregistration failed:", error);
  }
}

export function skipServiceWorkerWaiting() {
  if (!("serviceWorker" in navigator)) return;

  navigator.serviceWorker.controller?.postMessage({
    type: "SKIP_WAITING",
  });
}
