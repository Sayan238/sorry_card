// Helper to open WhatsApp directly into the app with prefilled message
export function openWhatsAppDirectly(
  phone = "919395639289",
  message = "ok baby maaf kiya"
) {
  const encoded = encodeURIComponent(message);
  const appDeepLink = `whatsapp://send?phone=${phone}&text=${encoded}`;
  const webLink = `https://api.whatsapp.com/send?phone=${phone}&text=${encoded}`;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  try {
    if (isMobile) {
      // Direct native app launch on mobile
      window.location.href = appDeepLink;
      // Fallback to web link if app isn't installed
      setTimeout(() => {
        window.location.href = webLink;
      }, 1500);
    } else {
      // Desktop: window.open opens WhatsApp Desktop or WhatsApp Web
      window.open(appDeepLink, "_blank") || (window.location.href = webLink);
    }
  } catch (e) {
    window.location.href = webLink;
  }
}
