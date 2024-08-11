import React from "react";
import MonacoEditor from '@monaco-editor/react';

function Editor({ code, setCode, language, setLanguage }) {
    return (
        <MonacoEditor
            height="100%"
            language={ language }
            theme="vs-dark"
            value={ code }
            onChange={ setCode }
            options={ {
                minimap: { enabled: false },
            } }
        />
    );
}

export default Editor;