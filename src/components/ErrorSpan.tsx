interface Props {
    error: string | null;
}

export default function ErrorSpan({ error }: Props) {
    return (
        error && (
            <span className="w-full text-rose-500 text-sm font-medium p-2 rounded-md border border-rose-300 bg-rose-500/10">
                {error}
            </span>
        )
    )
}
