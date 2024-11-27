const tf = require('@tensorflow/tfjs-node')

exports.predictClasification = async (model, img) => {
    const tensor = tf.node.decodeImage(img).resizeNearestNeighbor([224, 224]).expandDims().toFloat()
    const prediction = model.predict(tensor)
    const score = await prediction.data()
    const confidenceScore = Math.max(...score) * 100
    
    let result = {
        confidenceScore,
        label: "Cancer",
        suggestion: "Segera periksa ke dokter!"
    }

    if (confidenceScore < 1){
        result = {
            confidenceScore,
            label: "Non-cancer",
            suggestion: "Penyakit kanker tidak terdeteksi."
        }
    }
    return result
}