export default function LoadingDots() {
    const color = "#000";

    return (
        <span className="loading">
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
            <span style={{ backgroundColor: color }} />
        </span>
    );
};