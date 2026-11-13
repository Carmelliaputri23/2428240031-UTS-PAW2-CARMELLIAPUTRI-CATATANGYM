import Gym from '../models/gym.model.js'
import { z } from 'zod'

// Validasi data
const gymSchema = z.object({
    gym_name: z.string().trim().min(1, 'Nama gym wajib diisi'),
    duration_minutes: z.coerce.number().min(1, 'Durasi minimal 1 menit'),
    date: z.coerce.date()
})

// CREATE
const store = async (req, res, next) => {
    try {
        const validatedData = gymSchema.parse(req.body)

        const gym = await Gym.create(validatedData)

        res.status(201).json({
            success: true,
            message: 'Catatan gym berhasil ditambahkan',
            data: gym
        })
    } catch (error) {
        next(error)
    }
}

// READ ALL + SEARCH + ORDER
const index = async (req, res, next) => {
    try {
        const { search, sortBy, order } = req.query

        const filter = {}

        if (search) {
            filter.gym_name = {
                $regex: search,
                $options: 'i'
            }
        }

        const allowedFields = [
            'gym_name',
            'duration_minutes',
            'date',
            'createdAt'
        ]

        const field = allowedFields.includes(sortBy)
            ? sortBy
            : 'date'

        const direction = order === 'asc' ? 1 : -1

        const data = await Gym.find(filter).sort({
            [field]: direction
        })

        res.status(200).json({
            success: true,
            message: 'Berhasil menampilkan catatan gym',
            total: data.length,
            data
        })
    } catch (error) {
        next(error)
    }
}

// READ DETAIL
const show = async (req, res, next) => {
    try {
        const gym = await Gym.findById(req.params.id)

        if (!gym) {
            return res.status(404).json({
                success: false,
                message: 'Catatan gym tidak ditemukan'
            })
        }

        res.status(200).json({
            success: true,
            data: gym
        })
    } catch (error) {
        next(error)
    }
}

// UPDATE
const update = async (req, res, next) => {
    try {
        const validatedData = gymSchema.parse(req.body)

        const gym = await Gym.findByIdAndUpdate(
            req.params.id,
            validatedData,
            {
                new: true,
                runValidators: true
            }
        )

        if (!gym) {
            return res.status(404).json({
                success: false,
                message: 'Catatan gym tidak ditemukan'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Catatan gym berhasil diperbarui',
            data: gym
        })
    } catch (error) {
        next(error)
    }
}

// DELETE
const destroy = async (req, res, next) => {
    try {
        const gym = await Gym.findByIdAndDelete(req.params.id)

        if (!gym) {
            return res.status(404).json({
                success: false,
                message: 'Catatan gym tidak ditemukan'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Catatan gym berhasil dihapus'
        })
    } catch (error) {
        next(error)
    }
}

export default {
    store,
    index,
    show,
    update,
    destroy
}
