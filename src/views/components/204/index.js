

export const NoContent = (props) => {
    return (
        <div className="p-5 text-center">
            <p className="text-md font-medium text-primary mt-4">{props.message || "No data found."}</p>
        </div>
    )
}