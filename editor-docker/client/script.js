let editor;

require.config({ paths: { vs: 'https://unpkg.com/monaco-editor@0.45.0/min/vs' } });

require(['vs/editor/editor.main'], function () {
  editor = monaco.editor.create(document.getElementById('editor'), {
    value: `// Write your JavaScript code here\nconsole.log("Hello, World!");`,
    language: 'javascript',
    theme: 'vs-dark',
    fontSize: 14,
    automaticLayout: true,
    minimap: { enabled: false },
  });
});

// Format the code using Prettier
function formatCode() {
  try {
    const rawCode = editor.getValue();
    const formatted = prettier.format(rawCode, {
      parser: 'babel',
      plugins: prettierPlugins,
      semi: true,
      singleQuote: true,
    });
    editor.setValue(formatted);
  } catch (err) {
    document.getElementById('output').textContent = `❌ Format Error:\n${err.message}`;
  }
}

// Send code to server and display output
// and don't forget to change the fetch url as I have just hardcoded it to localhost:3000
function runCode() {
  
  const code = editor.getValue();
  const outputBox = document.getElementById('output');
  outputBox.textContent = '';

  fetch('http://localhost:3000/run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  })
    .then(response => response.json())
    .then(json => outputBox.textContent = json.output || '// No output' );
}
