function parseHeaders(text) {
  const headers = {};
  for (const raw of text.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const idx = line.indexOf(":");
    if (idx <= 0) throw new Error(`Invalid header line: ${line}`);
    const name = line.slice(0, idx).trim();
    const value = line.slice(idx + 1).trim();
    headers[name] = value;
  }
  return headers;
}

function formatBody(contentType, text) {
  if (!text) return "(empty body)";
  if ((contentType || "").includes("application/json")) {
    try {
      return JSON.stringify(JSON.parse(text), null, 2);
    } catch {
      return text;
    }
  }
  return text;
}

const form = document.getElementById("request-form");
const meta = document.getElementById("meta");
const responseEl = document.getElementById("response");
const abortBtn = document.getElementById("abort-btn");
let controller = null;

abortBtn.addEventListener("click", () => {
  if (controller) controller.abort();
});

// Ctrl/Cmd+Enter submits the request form from any field.
form.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    form.requestSubmit();
  }
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const method = document.getElementById("method").value;
  const url = document.getElementById("url").value.trim();
  const headersText = document.getElementById("headers").value;
  const bodyText = document.getElementById("body").value;

  let headers;
  try {
    headers = parseHeaders(headersText);
  } catch (err) {
    meta.textContent = err.message;
    return;
  }

  controller = new AbortController();
  abortBtn.disabled = false;
  meta.textContent = "Sending…";
  responseEl.textContent = "";

  const init = { method, headers, signal: controller.signal };
  if (method !== "GET" && method !== "HEAD" && bodyText.trim()) {
    init.body = bodyText;
    if (!Object.keys(headers).some((k) => k.toLowerCase() === "content-type")) {
      headers["Content-Type"] = "application/json";
    }
  }

  const started = performance.now();
  try {
    const res = await fetch(url, init);
    const text = await res.text();
    const elapsed = Math.round(performance.now() - started);
    const headerDump = [...res.headers.entries()]
      .map(([k, v]) => `${k}: ${v}`)
      .join("\n");
    meta.textContent = `${res.status} ${res.statusText} · ${elapsed} ms`;
    responseEl.textContent = `${headerDump}\n\n${formatBody(res.headers.get("content-type"), text)}`;
  } catch (err) {
    const elapsed = Math.round(performance.now() - started);
    meta.textContent = err.name === "AbortError" ? `Aborted · ${elapsed} ms` : `Error · ${elapsed} ms`;
    responseEl.textContent = err.message || String(err);
  } finally {
    abortBtn.disabled = true;
    controller = null;
  }
});
