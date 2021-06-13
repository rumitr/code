import React, { useRef, useEffect, useState } from "react";
import ace from "ace-builds";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/mode-html";

import { download } from "../lib";
import Counter from "./Counter";

const initialValue = `<!DOCTYPE html>
<html>
<head>
<title>Page Title</title>
<style>
body {
  background-color: black;
  text-align: center;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
}
</style>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
<p>Edit the code in the window to the lef and click "Run" to view the result.</p>
<img src="avatar.png" alt="Avatar" style="width:200px">

</body>
</html>
`;
const themeOptions = ["monokai", "github"];

const Editor = () => {
  const editorRef = useRef();
  const iframeRef = useRef();

  const [theme, setTheme] = useState("monokai");
  const [text, setText] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  //configure Editor
  useEffect(() => {
    var temp = ace.edit(editorRef.current);
    temp.session.setMode("ace/mode/html");
    temp.session.setUseWrapMode(true);
    temp.session.setValue(text);
    temp.setHighlightActiveLine(true);

    //setUp setupEvents
    temp.on("change", (e) => {
      if (!isDirty) {
        setIsDirty(true);
      }
    });

    return () => {
      temp.off("change");
    };
  }, [isDirty, text]);

  useEffect(() => {
    var temp = ace.edit(editorRef.current);
    temp.setTheme(`ace/theme/${theme}`);
  }, [theme]);

  //use ctrl/cmd + s to save the code
  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      var S = 83;

      if (
        (event.key === S || event.keyCode === S) &&
        (event.metaKey || event.ctrlKey)
      ) {
        event.preventDefault();
        execute();
      }
    });

    // if ((event.key === S || event.keyCode === S) && (event.metaKey || event.ctrlKey) && activeElement.nodeName === 'TEXTAREA') {
  }, []);
  const execute = () => {
    var temp = ace.edit(editorRef.current);
    setText(temp.getValue());
  };

  const downloadTxt = () => {
    var temp = ace.edit(editorRef.current);

    const text = temp.getValue();
    setText(text);
    download("code", text);
  };

  const changeFontSize = (fontSize) => {
    var temp = ace.edit(editorRef.current);
    temp.setFontSize(fontSize);
  };

  return (
    <>
      <div className={`options ${theme === "github" ? "light" : "dark"}`}>
        <div>
          <Counter onChange={changeFontSize} />{" "}
          <select
            onChange={(e) => setTheme(e.target.value)}
            value={theme}
            name=""
            id=""
          >
            {themeOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="btn-grp">
          <button disabled={isDirty} onClick={execute}>
            Execute
          </button>
          <button onClick={downloadTxt}>Download</button>
        </div>
      </div>
      <div className="editor" ref={editorRef}></div>
      <div className="output">
        <iframe
          ref={iframeRef}
          frameBorder="0"
          title="description"
          src={"data:text/html," + encodeURIComponent(text)}
        />
      </div>
    </>
  );
};

export default Editor;
