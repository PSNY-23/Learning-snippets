const express = require('express');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { v4: uuidv4 } = require('uuid');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const TEMP_DIR = path.join(__dirname, 'temp-code');
fs.mkdirSync(TEMP_DIR, { recursive: true });

app.post('/run', async (req, res) => {
  const userCode = req.body.code;
  const id = uuidv4();
  const containerName = `code-runner-${id}`;
  const codeDir = path.join(TEMP_DIR, id);
  

  fs.mkdirSync(codeDir);

  const runJsPath = path.join(codeDir, 'run.js');
  console.log(`Writing user code to ${runJsPath}`);
  fs.writeFileSync(runJsPath, userCode);

  

  try {
    // Build and run the container
    const command = `docker build -t ${containerName} ./sandbox && docker run --rm -v "${codeDir}:/app" ${containerName}`;
    exec(command, { timeout: 50000 }, (err, stdout, stderr) => {
      // Clean up
      fs.rmSync(codeDir, { recursive: true, force: true });

      if (err && err.killed) {
        // Execution was forcefully killed due to timeout
        res.status(500).json({ error: 'Execution timed out or was killed.' });
      } else if (err) {
        // Docker command failed
        res.status(500).json({ error: stderr || err.message });
      } else {
        // Success
        res.json({ output: stdout || '// No output' });
      }

    });
  } catch (error) {
    res.status(500).json({ error: 'Execution failed' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
