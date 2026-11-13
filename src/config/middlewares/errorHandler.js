import { ZodError } from 'zod'

const errorHandler = (err, req, res, next) => {

    // Validasi Zod
    if (err instanceof ZodError) {
        return res.status(422).json({
            success: false,
            message: 'Validation error',
            errors: err.flatten().fieldErrors
        })
    }

    // Data tidak ditemukan
    if (err.status === 404) {
        return res.status(404).json({
            success: false,
            message: err.message
        })
    }

    // Kesalahan MongoDB
    if (err.name === 'CastError') {
        return res.status(400).json({
            success: false,
            message: 'ID tidak valid'
        })
    }

    // Duplicate data
    if (err.code === 11000) {
        return res.status(409).json({
            success: false,
            message: 'Data sudah tersedia'
        })
    }

    // Kesalahan server
    console.error(err)

    return res.status(500).json({
        success: false,
        message: 'Internal Server Error'
    })
}

export default errorHandler
