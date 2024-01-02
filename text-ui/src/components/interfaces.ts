export type ChatGPTMessages = {
    role: 'user' | 'assistant',
    content: string
}

export const Frameworks = [
    { label: "HTML", value: "html" },
    { label: "Next.js + Tailwind CSS", value: "next-tailwind" },
    { label: "Next.js + MUI", value: "next-mui" },
    { label: "React + Tailwind CSS", value: "react-tailwind" },
    { label: "React + MUI", value: "react-mui" },
];