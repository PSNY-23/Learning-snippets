# 🧪 Code Runner in Docker (JS Demo)

This is a simple web-based code editor and execution environment. It allows users to write JavaScript code in the browser, which is then sent to a backend server. The server spins up a Docker container for each request, runs the code inside the container, and returns the result back to the frontend console.

---

## 🚀 How It Works

- The frontend is a minimal Monaco-powered JavaScript code editor.
- On each run:
  1. The code is sent to the Express backend.
  2. The backend creates a temporary folder and writes the code to `run.js`.
  3. A Docker container is built and run, mounting the code.
  4. The code is executed inside the isolated container.
  5. The output (or error) is sent back to the frontend and shown in the console.

---

## ⚙️ Requirements

- [Docker](https://www.docker.com/) must be installed and **Docker Engine must be running**.
- Node.js environment for running the Express backend.

---

## ⚠️ Important Notes

- This is a **demo implementation**. No optimization, rate-limiting, or security hardening has been applied.
- Each code execution spins up a new container and removes it afterward.
- The server assumes it’s running on port **3000**. If not, **you must update the `fetch` URL** in the frontend JS accordingly.
- Currently only supports JavaScript, but the Docker setup can be extended to support any language (e.g. Python, C++, Java) by modifying the Dockerfile.

---

## 📂 Project Structure

