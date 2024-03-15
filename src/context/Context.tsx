import { createContext, useState } from "react";
import runChat from "../config/gemini";
import markdownit from 'markdown-it';
import hljs from 'highlight.js'

interface GeminiContextType {
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

const md = markdownit({
    html: true,
    linkify: true,
    typographer: true,
    highlight: (code, lang) => {
        console.log(hljs.getLanguage(lang), 'hljs.getLanguage(lang) | hljs.getLanguage(lang)');
        if (lang && hljs.getLanguage(lang)) {
            try {
                return hljs.highlight(code, { language: lang }).value;
            } catch (_) { }
        }
        return '';
    },
});

export const Context = createContext<GeminiContextType | undefined>(undefined);

const ContextProvider = (props: any) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompt] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const depayPara = (index: number, nextWord: string) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord)
        }, 75 * index);
    }

    const onSent = async (prompt: any) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);
        const response = await runChat(input);
        const newResArray = md.render(response).split(" ");
        for (let i = 0; i < newResArray.length; i++) {
            const nextWord = newResArray[i];
            depayPara(i, nextWord + " ");

        }
        // setResultData(md.render(response));
        setLoading(false);
        setInput("")
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