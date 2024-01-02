import { toast } from "react-hot-toast";

// @ts-ignore
export default function generatedCode({ generatedCode, exportedCode }): JSX.Element {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(exportedCode);
        toast("Code copied to clipboard",{ icon: "✂️",});
    }

    return (
        <>
            <div>
                <h2 className="result-text">
                    Click the element to copy the code 👇
                </h2>
            </div>
            <div onClick={copyToClipboard} className="result">
                <div dangerouslySetInnerHTML={{
                    __html: generatedCode
                }}>
                </div>
            </div>
        </>

    )
}