// @ts-ignore
export default function generatedCode({ generatedCode, exportedCode }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(exportedCode)
    }

    return (
        <>
            <div onClick={copyToClipboard} className="result">
            <div dangerouslySetInnerHTML={{
                __html: generatedCode
            }}>
            </div>
            </div>
        </>

    )
}