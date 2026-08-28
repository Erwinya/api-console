# api-console

Browser HTTP console: method, URL, headers, body, timed response viewer, and abort support.

Uses the Fetch API only (no backend, no framework).

## Usage

Open `index.html` in a browser (or serve the folder with any static file server).

1. Pick method and URL (default: `https://httpbingo.org/get`)
2. Optional headers — one per line: `Name: Value`
3. Optional JSON body for POST/PUT/PATCH/DELETE
4. **Send** — response status, timing, headers, and body appear on the right (or press `Ctrl+Enter` / `Cmd+Enter`)
5. **Abort** cancels an in-flight request (or press `Escape` while a request is running)

If the response panel stays empty, check the URL, CORS errors in the browser console, and whether the target API is reachable.

Cross-origin calls depend on the target API's CORS policy.

## License

MIT
