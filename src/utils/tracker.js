// Silent Activity Tracker for Sayan's Diary
// Automatically and invisibly sends real-time activity updates
// directly to sayanbarman30062005@gmail.com in table/spreadsheet format!

// FormSubmit unique token for sayanbarman30062005@gmail.com
// This works universally across Vercel, localhost, or any production URL!
const FORMSUBMIT_TOKEN = "77367ce451d488a22acc350686786783";
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

// Send email silently in background via FormSubmit (formatted as HTML table)
async function sendEmailUpdate(action, detailsStr, customSubject) {
  const timestamp = getISTTimestamp();
  const deviceType = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)
    ? "Mobile 📱"
    : "Desktop / Laptop 💻";
  const screen = `${window.innerWidth} x ${window.innerHeight}`;

  const subject = customSubject || `🔔 BK Activity: ${action}`;

  const payload = {
    _subject: subject,
    _template: "table", // Formats the email directly as a clean spreadsheet table!
    _captcha: "false",
    Activity: action,
    Details: detailsStr || "—",
    "Time (IST)": timestamp,
    Device: deviceType,
    "Screen Size": screen,
    "Session ID": SESSION_ID,
  };

  try {
    await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_TOKEN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
  } catch (err) {
    // Fail silently so user experience is never interrupted
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
