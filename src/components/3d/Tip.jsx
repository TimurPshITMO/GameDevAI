export default function Tip({heading, children}){
    return (
        <div className="helping-tip">
            <h3>{heading}</h3>
            {children}
        </div>
    )
}