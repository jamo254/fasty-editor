// components/Preview.js
import React, { useEffect, useRef } from 'react';

function Preview({ code, language }) {
    const iframeRef = useRef(null);

    useEffect(() => {
        if (language === 'html') {
            const iframe = iframeRef.current;
            const iframeDoc = iframe.contentDocument;
            iframeDoc.open();
            iframeDoc.write(code);
            iframeDoc.close();
        }
    }, [code, language]);

    if (language !== 'html') {
        return null;
    }

    return (
        <div className="h-1/2 border-t border-gray-700">
            <iframe
                ref={ iframeRef }
                className="w-full h-full"
                title="Code Preview"
            />
        </div>
    );
}

export default Preview;