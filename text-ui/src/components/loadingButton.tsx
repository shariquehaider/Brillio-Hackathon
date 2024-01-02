export default function LoadingDots(): JSX.Element {
    const color = "#000";

    return (
        <span className="loading">
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    );
};