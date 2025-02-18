export function PreparacionTerrenoCard({ preparacion }) {
    return (
        <div>
            <h3>Preparación de {preparacion.idPlantacion.nombreParcela}</h3>
            <p>Limpieza del terreno: {preparacion.limpiezaTerreno}</p>
            <p>Análisis de suelo: {preparacion.analisisSuelo}</p>
            <p>Corrección de suelo: {preparacion.correcionSuelo}</p>
            <p>Labranza: {preparacion.labranza}</p>
            <p>Delimitación de parcela: {preparacion.delimitacionParcela} m²</p>
        </div>
    );
}
