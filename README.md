# api-console

Browser HTTP console: method, URL, headers, body, timed response viewer, and abort support.

Uses the Fetch API only (no backend, no framework).

## Usage

Open `index.html` in a browser (or serve the folder with any static file server).

1. Pick method and URL (default: `https://httpbingo.org/get`)
2. Optional headers — one per line: `Name: Value`
3. Optional JSON body for POST/PUT/PATCH/DELETE
4. **Send** — response status, timing, headers, and body appear on the right
5. **Abort** cancels an in-flight request

Cross-origin calls depend on the target API's CORS policy.

## License

MIT
