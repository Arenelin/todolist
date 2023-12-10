export function NewComponent() {
    const topCars = [
        {manufacturer: 'BMW', model: 'm5cs'},
        {manufacturer: 'Mercedes', model: 'e63s'},
        {manufacturer: 'Audi', model: 'rs6'}
    ]

    return (
        <table>
            <tbody>
            {topCars.map((c, index) =>
                <tr key={index}>
                    <th>{index + 1})</th>
                    <th>{c.manufacturer}</th>
                    <th> model: {c.model}</th>
                </tr>
            )}
            </tbody>
        </table>
    )
}