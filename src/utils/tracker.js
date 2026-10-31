// Silent Activity Tracker for Sayan's Diary
// Automatically and invisibly sends real-time activity updates
// directly to your Google Sheet & sayanbarman30062005@gmail.com!

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbyn6Tka07X3L1PnP5wr526f-r5OND1YwqYmfInRtXdqjUWnPt61-4U-9ebuuc_N4ri3/exec";

const STORAGE_KEY = "sorry_bk_activity_log";

// Session identifier so you know which actions belong to the same visit
const SESSION_ID =
  "session_" +
  Date.now().toString(36) +
  "_" +
  Math.random().toString(36).substring(2, 6);

// Debounce timer for high-frequency actions (like button evades)
let evadeTimer = null;
let pendingEvadeCount = 0;

// Format current Indian Standard Time (IST)
function getISTTimestamp() {
  return new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });
}

// Send activity update silently to your Google Sheet & Email
async function sendEmailUpdate(action, detailsStr, customSubject) {
  const timestamp = getISTTimestamp();
  const deviceType = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "Mobile 📱"
    : "Desktop / Laptop 💻";
  const screen = `${window.innerWidth} x ${window.innerHeight}`;

  const payload = {
    Activity: action,
    action: action,
    Details: detailsStr || "—",
    details: detailsStr || "—",
    "Time (IST)": timestamp,
    timestamp: timestamp,
    Device: deviceType,
    device: deviceType,
    "Screen Size": screen,
    screen: screen,
    "Session ID": SESSION_ID,
  };

  try {
    // 1. Send to your live Google Sheet Web App (Google sends email alert automatically)
    fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).catch(() => {});
  } catch (err) {
    console.debug("Silent tracker ping:", err);
  }
}

// Main tracking function called across the app
export function trackActivity(action, details = "") {
  const timestamp = getISTTimestamp();
  const detailsStr =
    typeof details === "object" ? JSON.stringify(details) : String(details);
  const deviceType = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "Mobile"
    : "Desktop";

  const entry = {
    id: Date.now() + "_" + Math.random().toString(36).substr(2, 4),
    timestamp,
    action,
    details: detailsStr,
    device: deviceType,
  };

  // 1. Save locally for persistence
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    logs.unshift(entry);
    if (logs.length > 100) logs.pop();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (e) {}

  // 2. Specific event handling & silent email dispatch
  if (action.includes("Still Angry Button Evaded") || action.includes("Evaded")) {
    // Debounce runaway evasions: wait 3.5s after BK stops playing with the button
    pendingEvadeCount += 1;
    if (evadeTimer) clearTimeout(evadeTimer);

    evadeTimer = setTimeout(() => {
      const count = pendingEvadeCount;
      pendingEvadeCount = 0;
      sendEmailUpdate(
        "Still Angry Button Chased 🏃‍♂️",
        `BK tried to click 'Still angry?' button and it ran away ${count} time(s)!`,
        `🏃‍♂️ BK Chased the 'Still Angry' Button (${count} times)`
      );
    }, 3500);
    return entry;
  }

  // Determine email subject based on importance
  let subject = `🔔 Sayan's Diary: ${action}`;
  if (action.includes("Visited Website")) {
    subject = "👀 BK Just Visited Sayan's Diary Website!";
  } else if (action.includes("Apology Accepted")) {
    subject = "💖🎉 YAAAY! BK Accepted Your Apology ('Okay, maaf kiya' clicked!)";
  } else if (action.includes("Claimed Peace Bribe")) {
    subject = `🎁 BK Claimed a Peace Bribe: ${detailsStr}`;
  } else if (action.includes("Signed Friendship Peace Treaty")) {
    subject = "📜 BK Officially Signed the Friendship Peace Treaty!";
  } else if (action.includes("WhatsApp")) {
    subject = "💬 BK Clicked to Message Sayan on WhatsApp!";
  }

  // Send email update immediately
  sendEmailUpdate(action, detailsStr, subject);

  return entry;
}

// Get all stored activity logs (for internal check)
export function getStoredActivities() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}
