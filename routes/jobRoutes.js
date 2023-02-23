import express from 'express'
const router = express.Router()

import { createJob, getAllJobs, updateJob, showStats, deleteJob } from '../controllers/jobController.js'
import testUser from '../middleware/testUser.js'  //! testUser


router.post('/',testUser, createJob)
router.get('/', getAllJobs)
//OR we can write like this
// router.route('/').post(createJob).get(getAllJobs)

router.get('/stats', showStats)
router.patch('/:id',testUser, updateJob).delete('/:id', testUser,deleteJob)

export default router