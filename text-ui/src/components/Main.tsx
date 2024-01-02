import { useState, useRef } from "react";
import { OpenAPI } from "./Hooks";
import LoadingDots from "./loadingButton";
import { Frameworks } from "./interfaces";
import GeneratedCode from "./GeneratedCode";


export default function Main() {
    const [prompt, setPrompt] = useState("");
    const [ framework, setFramework ] = useState("Html")
    const { exportedCode, isLoading, generatedCode, requestUI, reset } = OpenAPI(() => setPrompt(""));

    const handleSelectedExport = (event: any) => {
        const selectedExport = event.target.value;
        setFramework(selectedExport);
    }
    const handlePrompt = (event: any) => {
        setPrompt(event.target.value)
    }
    const handleClick = (event: any): void => {
        event.preventDefault();
        requestUI(prompt, framework);
    }

    return (
        <div className="container-main">
            <div className="description">Transform your ideas into captivating user interfaces with just a few keystrokes. Whether you're a coding maestro or a creative wordsmith, this app bridges the gap, turning your textual vision into a visual masterpiece</div>
            <div className="form">
                <textarea onChange={handlePrompt} placeholder="Description the component you want to generate."></textarea>
                <div>
                    <select
                        id="select-option"
                        value={framework}
                        onChange={handleSelectedExport}
                        className="pl-4 pl-5 py-2 text-gray-700 bg-white border border-gray-400 rounded-md focus:outline-none focus:border-purple-500"
                    >
                        {Frameworks.map((framework) => <option key={framework.value} value={framework.value}>{framework.label}</option>)}
                    </select>
                </div>
                {!isLoading && (<><button className="button" disabled={!prompt} onClick={handleClick}>Generate</button> <button className="reset"
                            onClick={(e) => {
                                e.preventDefault();
                                reset();
                            }}>
                            Reset
                        </button></>)}
                {isLoading && <button className="button"
                    disabled><LoadingDots /></button>}
            </div>
            {generatedCode && <GeneratedCode generatedCode={generatedCode} exportedCode={exportedCode} />}
        </div>
    )
}