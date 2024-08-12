import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

const FastyEditor = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [url, setUrl] = useState('');
    const [iframeSrc, setIframeSrc] = useState('');
    const [useCodeOutput, setUseCodeOutput] = useState(true);

    useEffect(() => {
        if (useCodeOutput) {
            const timeout = setTimeout(() => {
                setSrcDoc(`
                    <html>
                    <body>${html}</body>
                    <style>${css}</style>
                    <script>${js}</script>
                    </html>
                `);
            }, 250);

            return () => clearTimeout(timeout);
        }
    }, [html, css, js, useCodeOutput]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const loadExternalSite = () => {
        if (url.trim()) {
            setUseCodeOutput(false);
            setIframeSrc(url.startsWith('http://') || url.startsWith('https://') ? url : `http://${url}`);
        }
    };

    const showGeneratedCode = () => {
        setUseCodeOutput(true);
        setIframeSrc('');
    };

    return (
        <div className="flex h-full overflow-hidden">
            {/* Sidebar */ }
            { isSidebarOpen && (
                <div className="w-1/5 bg-gray-800 p-4 overflow-auto">
                    <h1 className="text-2xl font-bold mb-4">Fasty Editor</h1>
                    <ul className="space-y-2">
                        <li>
                            <button className="text-sm font-medium text-gray-400 hover:text-white">
                                <i className="fas fa-file-alt mr-2"></i> New File
                            </button>
                        </li>
                        <li>
                            <button className="text-sm font-medium text-gray-400 hover:text-white">
                                <i className="fas fa-folder mr-2"></i> Open Folder
                            </button>
                        </li>
                        <li>
                            <button className="text-sm font-medium text-gray-400 hover:text-white">
                                <i className="fas fa-save mr-2"></i> Save
                            </button>
                        </li>
                    </ul>
                </div>
            ) }

            {/* Resizable Editor and Preview */ }
            <ResizableBox
                className="flex-1 flex flex-col resize-x overflow-hidden"
                minConstraints={ [300, 0] }
                maxConstraints={ [Infinity, Infinity] }
                width={ window.innerWidth * 0.65 } // Reduced width for the editor panels
                height={ Infinity }
                axis="x"
                resizeHandles={ ['e'] }
            >
                <div className="flex justify-between items-center bg-gray-900 p-2">
                    <button
                        onClick={ toggleSidebar }
                        className="text-sm font-medium text-gray-400 hover:text-white"
                    >
                        <i className={ `fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}` }></i>
                    </button>
                    <input
                        type="text"
                        className="bg-gray-800 text-gray-400 rounded-lg p-2 w-full mx-2"
                        placeholder="Enter a URL or leave empty to view your code"
                        value={ url }
                        onChange={ (e) => setUrl(e.target.value) }
                        onKeyPress={ (e) => e.key === 'Enter' && loadExternalSite() }
                    />
                    <button
                        onClick={ url ? loadExternalSite : showGeneratedCode }
                        className="text-sm font-medium text-gray-400 hover:text-white"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                <div className="flex flex-1">
                    <div className="w-2/3 p-4 overflow-auto"> {/* Increased width for editors */ }
                        <div className="mb-4">
                            <h2 className="font-bold text-lg">HTML</h2>
                            <Editor
                                height="25vh"  // Increased height for editor panels
                                language="html"
                                theme="vs-dark"
                                value={ html }
                                onChange={ setHtml }
                            />
                        </div>
                        <div className="mb-4">
                            <h2 className="font-bold text-lg">CSS</h2>
                            <Editor
                                height="25vh"  // Increased height for editor panels
                                language="css"
                                theme="vs-dark"
                                value={ css }
                                onChange={ setCss }
                            />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">JavaScript</h2>
                            <Editor
                                height="25vh"  // Increased height for editor panels
                                language="javascript"
                                theme="vs-dark"
                                value={ js }
                                onChange={ setJs }
                            />
                        </div>
                    </div>
                    <div className="w-1/3 bg-gray-800 p-4 overflow-auto"> {/* Reduced width for output panel */ }
                        <iframe
                            src={ useCodeOutput ? 'about:blank' : iframeSrc }
                            title="Output"
                            sandbox="allow-scripts allow-same-origin"
                            frameBorder="0"
                            className="w-full h-full bg-white"
                            srcDoc={ useCodeOutput ? srcDoc : undefined }
                        />
                    </div>
                </div>
            </ResizableBox>
        </div>
    );
};

export default FastyEditor;

