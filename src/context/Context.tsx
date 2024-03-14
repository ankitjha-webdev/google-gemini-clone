import { createContext, useState } from "react";
import runChat from "../config/gemini";

type GeminiContextType = {
    prevPrompt: any;
    setPrevPrompt: any;
    onSent: any;
    setRecentPrompt: any;
    recentPrompt: any;
    showResult: any;
    loading: any;
    resultData: any;
    input: any;
    setInput: any;
}

export const Context = createContext<GeminiContextType | null>(null);

const ContextProvider = (props: any) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const onSent = async (prompt: any) => {

        await runChat(prompt);
    }

    const contextValue = {
        prevPrompt,
        setPrevPrompt,
        onSent,
        setRecentPrompt,
        recentPrompt,
        showResult,
        loading,
        resultData,
        input,
        setInput,

    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;