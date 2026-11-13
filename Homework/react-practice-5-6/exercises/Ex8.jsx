import { useRef, useState } from 'react';

export default function Ex8() {
    const fileInputRef = useRef(null);
    const [fileInfo, setFileInfo] = useState(null);

    function handleFileChange() {
        const file = fileInputRef.current?.files?.[0];
        if (file) {
            setFileInfo({
                name: file.name,
                sizeKb: (file.size / 1024).toFixed(1),
            });
        }
    }

    function handleClear() {
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // очистка DOM-инпута
        }
        setFileInfo(null);
    }

    return (
        <div style={{ maxWidth: 400, margin: '20px auto' }}>
            <h2>📎 Загрузка файла</h2>
            <input type="file" ref={fileInputRef} onChange={handleFileChange} />

            {fileInfo && (
                <div style={{ marginTop: 12 }}>
                    <p>Выбран: <strong>{fileInfo.name}</strong> ({fileInfo.sizeKb} КБ)</p>
                    <button type="button" onClick={handleClear}>Удалить файл</button>
                </div>
            )}
        </div>
    );
}