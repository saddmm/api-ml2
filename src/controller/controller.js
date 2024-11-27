const { storeData, getAllData } = require("../services/firestrore")
const { predictClasification } = require("../services/inference")
const { uploadHandler } = require("../util/multer")
const {v4: uuidv4} = require('uuid')

const upload = uploadHandler.single('image')

exports.postPredict = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            if (err.code === 'LIMIT_FILE_SIZE') {
                return res.status(413).json({
                    status: 'fail',
                    message: 'Payload content length greater than maximum allowed: 1000000'
                    })
            }
            return res.status(400).json({
                error: err.message
            })
        }

        try {
            const { model } = req.app.locals
            const id = uuidv4()
            const createdAt = new Date().toISOString()
            const imageBuffer = req.file.buffer;
            const { confidenceScore, suggestion, label } = await predictClasification(model, imageBuffer)
            
            const result = {
                id,
                result: label,
                suggestion,
                confidenceScore,
                createdAt
            }

            await storeData(id, result)

            res.status(201).json({
                status: "success",
                message: "Model is predicted successfully",
                data: {
                    id,
                    ...result
                }
            })    
        } catch(error) {
            res.status(400).json({
                status: "fail",
                message: "Terjadi kesalahan dalam melakukan prediksi",
                error
            })
        }
    }) 
}

exports.getAllData = async (req, res) => {
    const data = await getAllData()
    res.json({
        status: "success",
        data: data
    })
}