import mongoose from 'mongoose'

const gymSchema = new mongoose.Schema(
    {
        gym_name: {
            type: String,
            required: [true, 'Nama gym wajib diisi'],
            trim: true
        },

        duration_minutes: {
            type: Number,
            required: [true, 'Durasi latihan wajib diisi'],
            min: [1, 'Durasi minimal 1 menit']
        },

        date: {
            type: Date,
            required: [true, 'Tanggal latihan wajib diisi']
        }
    },
    {
        timestamps: true
    }
)

const Gym = mongoose.model('Gym', gymSchema)

export default Gym
