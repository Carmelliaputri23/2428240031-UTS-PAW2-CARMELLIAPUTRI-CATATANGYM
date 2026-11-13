import express from 'express'
import GymController from '../controllers/gym.controller.js'

const router = express.Router()

router.post('/gym', GymController.store)

router.get('/gym', GymController.index)

router.get('/gym/:id', GymController.show)

router.put('/gym/:id', GymController.update)

router.delete('/gym/:id', GymController.destroy)

export default router
