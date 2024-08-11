import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';

const FastyEditor = () => {
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [js, setJs] = useState('');
    const [srcDoc, setSrcDoc] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
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
    }, [html, css, js]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-full">
            {/* Sidebar */ }
            { isSidebarOpen && (
                <div className="w-1/5 bg-gray-800 p-4">
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

            {/* Editor and Preview */ }
            <div className={ `flex-1 flex flex-col ${isSidebarOpen ? 'w-4/5' : 'w-full'}` }>
                <div className="flex justify-between items-center bg-gray-900 p-2">
                    <button
                        onClick={ toggleSidebar }
                        className="text-sm font-medium text-gray-400 hover:text-white"
                    >
                        <i className={ `fas ${isSidebarOpen ? 'fa-angle-left' : 'fa-angle-right'}` }></i>
                    </button>
                </div>
                <div className="flex flex-1">
                    <div className="w-1/2 p-4">
                        <div className="mb-4">
                            <h2 className="font-bold text-lg">HTML</h2>
                            <Editor
                                height="20vh"
                                language="html"
                                theme="vs-dark"
                                value={ html }
                                onChange={ setHtml }
                            />
                        </div>
                        <div className="mb-4">
                            <h2 className="font-bold text-lg">CSS</h2>
                            <Editor
                                height="20vh"
                                language="css"
                                theme="vs-dark"
                                value={ css }
                                onChange={ setCss }
                            />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">JavaScript</h2>
                            <Editor
                                height="20vh"
                                language="javascript"
                                theme="vs-dark"
                                value={ js }
                                onChange={ setJs }
                            />
                        </div>
                    </div>
                    <div className="w-1/2 bg-gray-800 p-4">
                        <iframe
                            srcDoc={ srcDoc }
                            title="Output"
                            sandbox="allow-scripts"
                            frameBorder="0"
                            className="w-full h-full bg-white"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FastyEditor;
