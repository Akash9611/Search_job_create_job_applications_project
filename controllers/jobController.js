import Job from '../models/Job.js'
import { StatusCodes } from 'http-status-codes'
import { BadReqError, NotFoundError, UnauthenticatedError } from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
import mongoose from 'mongoose'
import moment from 'moment'
const createJob = async (req, res) => {
    const { company, position } = req.body

    if (!company || !position) {
        throw new BadReqError('Please provide all values')
    }

    req.body.createdBy = req.user.userId //createdBy holds main User _Id ,And req.user.userId holds the userAuth...inside into createdBy that login or Registered user id get stored [The code then checks if there is a value stored in createdBy that matches req.user.userId ]
    //^^^^^^^^^^^^to get auth user from middleware req is hitting by user and get userId   

    const user = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ user })

}
const getAllJobs = async (req, res) => {
    // console.log(req.user)  //to see logged user ID on console when setting up testUser to check testUser is true(present) or false(not present)

    //todo: Search Job [all jobs page] by using Query Params
    const { search, status, jobType, sort } = req.query        //using for search..to read string when typing. [req.query] is known as query params

    // const jobs = await Job.find({ createdBy: req.user.userId}); //*for testing
    const queryObject = {   //creating an object for handling Query Params easily
        createdBy: req.user.userId,
    }

    if (status && status !== 'all') {   //by default all means all status values. If not then, pending else interview else declined Which one is chosen that status values only
        queryObject.status = status;
    }
    if (jobType && jobType !== 'all') {
        queryObject.jobType = jobType;
    }
    //REGEX allow use to search by words
    if (search) {
        queryObject.position = { $regex: search, $options: 'i' } //!regex is built in property that allows us to search by single word or name we don't need to search by full name, options 'i' means Case-Insensitive 
    }

    let result = Job.find(queryObject) //! don't use [await] here Because we are using [query params] 

    //! chain sort conditions [it just sorting a result in AnyOne Order]
    if (sort === 'latest') {
        result = result.sort('-createdAt') //*by createdAt date in descending order(-)
    }
    if (sort === 'oldest') {
        result = result.sort('createdAt') //*by createdAt date in ascending order
    }
    if (sort === 'a-z') {
        result = result.sort('position') //*by position in ascending order
    }
    if (sort === 'z-a') {
        result = result.sort('-position')//*by position in descending order(-)
    }
    //! **********Pagination****************
    const page = Number(req.query.page) || 1;  // req.query is string parameter We have to convert it into Number.
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    result = result.skip(skip).limit(limit);
    //! ^^^^^^^^^^Pagination^^^^^^^^^^^^^^^^^^

    const jobs = await result
    // console.log(queryObject)
    const totalJobs = await Job.countDocuments(queryObject) //! no of jobs
    const numOfPages = Math.ceil(totalJobs/limit) //! total pages with limit of 10 job per page

    // res.status(StatusCodes.OK).json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
};

const updateJob = async (req, res) => {
    const { id: jobId } = req.params

    const { position, company } = req.body

    if (!position || !company) {
        throw new BadReqError('Please provide all values')
    }

    const job = await Job.findOne({ _id: jobId })

    if (!job) {
        throw new NotFoundError(`No job found with : ${jobId}`)
    }
    //!Check permissions IMP [if any user have the jobId of another user then he can change and update those job KeyValues data ...So we have to remove those permission for that user ....i.e why we are using CHECK PERMISSION] ...inCase -If you have admin don't remove permission for admin 
    //todo: console.log is to check for IDs types ....[that both Ids are same but they are now different type....because createdBy is keyValue in Job Schema so it is converted to Object]
    //! we have to match those values so we have convert object Id into toString()
    //*    console.log(typeof req.user.userId) // it is string type 
    //*    console.log(typeof job.createdBy) //it is object type 

    checkPermissions(req.user, job.createdBy)   //todo:  define it here if user don't have access then it return/stop function here ....and below update method is not going to invoked

    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, { new: true, runValidators: true })

    res.status(StatusCodes.OK).json({ updatedJob })
}

//* Another method to update/edit job ....we Already used this method for profile page in authController for updateUser
//! use only when you have some function/hook in models like [User] models //And this method only change defined keyValues ....use first method mostly if there is no hook/fun in models  
/*
const {id: jobId} =req.params

const {position , company, jobLocation} =req.body
if(!position || ! company){
        throw new BadReqError('Please provide all values')
       }
const job =await Job.findOne({_id:jobId})

if(!job){
    throw new NotFoundError(`No job found with :${jobId}`)
}

job.position = position,
job.company =company,
job.jobLocation =jobLocation

await job.save()
   res.status(StatusCodes.OK).json({job})
}
*/
const deleteJob = async (req, res) => {
    const { id: jobId } = req.params

    const job = await Job.findOne({ _id: jobId })
    if (!job) {
        throw new NotFoundError(`No job found with : ${jobId}`)
    }

    checkPermissions(req.user, job.createdBy)

    await job.remove() // build in method for deleting data 

    res.status(StatusCodes.OK).json({ msg: "Job Deleted Successfully" })
}

const showStats = async (req, res) => {//!Aggregation for getting status values and there count
    let stats = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },
        { $group: { _id: '$status', count: { $sum: 1 } } }
    ])
    //to convert array values into a object We can use [reduce] method /it is like find and filter methods   //todo: to know more refer=>[Reduce Basics](https://youtu.be/3WkW9nrS2mw)- [Reduce Object Example ](https://youtu.be/5BFkp8JjLEY)

    stats = stats.reduce((acc, currentItem) => {
        const { _id: statsTitle, count } = currentItem
        acc[statsTitle] = count
        return acc
    }, {})  //last {} is for returning as a object /IT WILL SHOW stats like this =>  
    //* "stats": {
    //*     "interview": 25,
    //*     "declined": 26,
    //*     "pending": 29
    //*           }

    //but if we don't have an any count then it will giv use "stats":{} as empty array ...to resolve this problem we have to do following steps
    const defaultStats = {
        interview: stats.interview || 0,
        pending: stats.pending || 0,
        declined: stats.declined || 0
    }

    //! to show monthly applied status and for chart
    let monthlyApplications = await Job.aggregate([
        { $match: { createdBy: mongoose.Types.ObjectId(req.user.userId) } },   // it is for matching the Id stored in createdBy ,it is now object and inside userId it is string so we have to convert that value into object i.e we mongoose.Types.ObjectId And match both IDs  
        {
            $group: {
                _id: {
                    year: { $year: '$createdAt' }, month: { $month: '$createdAt' }
                },//inside createdAt we have date and time ....we are separating and grouping year and months 
                count: { $sum: 1 }
            }
        }, //count returns the count of which jobs User are added at same month 
        { $sort: { '_id.year': -1, '_id.month': -1 } },  //-1 can sort the year and month latest added on first/descending order 
        { $limit: 6 } //it only return only top 6 limited result AS latest 6 months
    ])

    //Destructuring Data properly....like stats reduce function
    monthlyApplications = monthlyApplications.map((item) => {
        const { _id: { year, month }, count } = item

        const date = moment().month(month - 1).year(year).format('MMM Y')    //month Year[Aug 2022] formats like this together in one object on date....month-1 because it takes values from 0-11 i.e And we only need 12 months  
        return { date, count }  //Eg.formate should be like {date:'Aug 2022', count:3} this now
    }).reverse() // reverse method reverse the moths as oldest to latest ....that we Already have as limited 6 months in latest to oldest format 

    // res.status(StatusCodes.OK).json({stats})
    res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications })

}
export { createJob, getAllJobs, showStats, updateJob, deleteJob }