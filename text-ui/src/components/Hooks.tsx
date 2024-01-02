import { useState, useCallback } from "react";
import { ChatGPTMessages } from "./interfaces";

export function removeCodeWrapping(str: string) {
    if (str.startsWith('"""') && str.endsWith('"""')) {
        return str.slice(3, -3);
    } else {
        return str.replace("```", "");
    }
}

export function OpenAPI(clear: () => void) {
    const [isLoading, setLoading] = useState(false);
    const [conversation, setConversation] = useState<ChatGPTMessages[]>([]);
    const [generatedCode, setGeneratedCode] = useState("");
    const [exportedCode, setExportedCode] = useState<any>("");
    // const [selectedExport, setSelectedExport] = useState("");

    function createPrompt(role: 'user' | 'assistant', content: string): ChatGPTMessages {
        return {
            role,
            content
        };
    }

    const requestUI = useCallback(async (prompt: string, framework: string) => {
        setLoading(true);
        setExportedCode(() => {
            return framework;
        });
        const request = createPrompt('user', prompt);
        setConversation(prevValue => [...prevValue, request]);
        const response = await fetch("/api/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                messages: [...conversation, request]
            }),
        });
        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const data = response.body;
        if (!data) {
            return;
        }
        const rawValue = await response.text();
        const reply = createPrompt('assistant', rawValue);
        setConversation(prevValue => [...prevValue, reply]);
        const code = removeCodeWrapping(rawValue);
        if (framework === "Html") {
            setExportedCode(code);
        } else {
            const frameworkCode = await fetch('/api/export', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    prompt: rawValue,
                    framework: framework
                }),
            })

            const translatedFrameworkCode = frameworkCode.body;
            if (!translatedFrameworkCode) {
                return;
            }
            const readerData = translatedFrameworkCode.getReader();
            const decoderData = new TextDecoder();
            const {value: translatedCodeValue} = await readerData.read();
            const newCode = decoderData.decode(translatedCodeValue)

            setExportedCode(newCode);
        }
        const newCode = code.replace(/\\/g, '')
        setGeneratedCode(newCode.replace(/n /g, ''));
        // setSelectedExport("Html");
        clear();
        setLoading(false);
    }, [conversation]);

    const reset = useCallback(() => {
        setConversation([]);
        setGeneratedCode("");
        setLoading(false);
        // setSelectedExport("Html");
        clear();
    }, []);
    return {exportedCode, isLoading, requestUI, generatedCode, reset};
}